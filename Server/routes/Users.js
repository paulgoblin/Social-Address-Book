'use strict';

const express = require('express');
const User = require('../models/userModel');
const Avatar = require('../models/avatarModel');

let router = express.Router();

router.get('/', function (req, res){
  User.find({}).populate('avatar')
  .exec(function (err, users){
    users = users.map(user => {
      user = user.toObject();
      delete user.password;
      return user;
    });
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.get('/me', function(req, res){
  User.findById(req.userId).populate('avatar')
  .exec(function(err, user){
    user = user.toObject();
    delete user.password;
    res.status(err ? 400 : 200).send(err || user);
  });
});

router.post('/favorites', function (req, res){
  User.findById(req.userId).populate('avatar')
  .exec(function (err, user){
    user.toggleFavorite(req.body.favId, function(err){
      user = user.toObject();
      delete user.password;
      res.status(err ? 400 : 200).send(err || user);
    });
  });
});

router.post('/admin', function (req, res){
  if (!req.isAdmin) return res.status(403).send('You are not authorized to do this action');
  User.findByIdAndUpdate(req.body.id, {isAdmin: true}).populate('avatar')
  .exec(function (err, newAdmin){
    newAdmin = newAdmin.toObject();
    delete newAdmin.password;
    res.status(err ? 400 : 200).send(err || newAdmin);
  });
});

router.put('/', function (req, res){
  console.log("saving user ", req.body);
  if (req.userId === req.body._id || req.isAdmin){
    User.findByIdAndUpdate(req.body._id, req.body)
    .populate('avatar')
    .exec(function (err, updatedUser){
      updatedUser = updatedUser.toObject();
      delete updatedUser.password;
      console.log("sending updated user", updatedUser);
      console.log("res status", res.statusCode, res.body);
      res.status(err ? 400 : 200).send(err || updatedUser);
    });
  } else {
    res.status(403).send('You are not authorized to do this action');
  }
});

router.delete('/', function (req, res){
  if (req.userId === req.body._id || req.isAdmin){
    User.findByIdAndRemove(req.body._id, function (err, removedUser){
      res.status(err ? 400 : 200).send(err || 'removed');
    });
  }else{
    res.status(403).send('You are not authorized to do this action');
  }
});

router.post('/avatar', function(req, res){
  console.log("id confirmation", req.userId, Object.keys(req.body.img));
  if (req.userId === req.body._id || req.isAdmin){
    Avatar.create( {img: {data: req.body.img.base64, contentType:req.body.img.filetype}} , function(err, newAvatar){
      if (err) return res.status(400).send(err);
      User.findById(req.userId, function(err, user){
        if (err) return res.status(400).send(err);
        user.avatar = newAvatar._id;
        user.save(function(err){
          user.avatar = newAvatar;
          user = user.toObject();
          delete user.password;
          res.status(err ? 400 : 200).send(err || user);
        });
      })
    });
  }else{
    res.status(403).send('You are not authorized to do this action');
  }
})

module.exports = router;
