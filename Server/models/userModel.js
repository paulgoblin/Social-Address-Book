  'use strict';

const mongoose = require('mongoose')
    , jwt      = require('jwt-simple')
    , bcrypt   = require('bcryptjs')
    , moment   = require('moment')
    , CONFIG   = require('../config/auth');

let User,
    Schema = mongoose.Schema;

let userSchema = Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type:String, default: ' '},
  favorites: [{type:Schema.Types.ObjectId, ref: User}],
  profilename: {type: String, default:' '},
  isAdmin: {type:Boolean, default:false},
  phone: {type:String, default:' '},
  address: {type: String, default:' '},
  about:{type: String, default:' '}
});

userSchema.methods.token = function() {
  let payload = {
    id: this._id,
    iat: moment().unix(),
    exp: moment().add(CONFIG.expTime.num, CONFIG.expTime.unit).unix()
  };
  return jwt.encode(payload, process.env.JWT_SECRET);
};

userSchema.statics.login = function(userInfo, cb) {
  // look for user in database
  User.findOne({username: userInfo.username}, (err, foundUser) => {
    if (err) return cb('server error');
    if (!foundUser) return cb('incorrect username or password');
    bcrypt.compare(userInfo.password, foundUser.password, (err, isGood) => {
      if (err) return cb('server err');
      if (isGood) {
        foundUser.password = null;
        return cb(null, foundUser);
      } else {
        return cb('incorrect username or password');
      }
    });
  });
}

userSchema.statics.register = function(userInfo, cb) {
  let username  = userInfo.username
    , password  = userInfo.password
    , password2 = userInfo.password2;

  // compare passwords
  if (password !== password2) {
    return cb("passwords don't match");
  }

  // validate password
  if (!CONFIG.validatePassword(password)) {
    return cb('invalid password');
  }

  // validate username
  if (!CONFIG.validateUsername(username)) {
    return cb('invalid username');
  }

  // create user model
  User.findOne({username: username}, (err, user) => {
    if (err) return cb('error registering username');
    if (user) return cb('username taken');
    bcrypt.genSalt(CONFIG.saltRounds, (err, salt) => {
      if (err) return cb(err);
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) return cb(err);
        let newUser = new User({
          username: username,
          password: hashedPassword
        });
        newUser.save((err, savedUser) => {
          savedUser.password = null;
          return cb(err, savedUser);
        })
      });
    });
  });
};

userSchema.methods.toggleFavorite = function(togId, cb){
  var foundFavIndex = this.favorites.indexOf(togId);
  if (foundFavIndex===-1) {
    this.favorites.push(togId)
  } else {
    this.favorites.splice([foundFavIndex],1);
  }
  this.save(cb)
}


User = mongoose.model('User', userSchema);
module.exports = User;
