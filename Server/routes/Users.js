'use strict';

const express = require('express');
const User = require('../models/userModel');
const Avatar = require('../models/avatarModel');

let router = express.Router();

router.get('/', function (req, res){
  User.find({}, function (err, users){
    users = users.map(user => {
      user.password = null;
      return user;
    })
    res.status(err ? 400 : 200).send(err || users);
  })
})

router.get('/me', function(req, res){
  User.findById(req.userId, function(err, user){
    user.password = null;
    res.status(err ? 400 : 200).send(err || user);
  })
})

router.post('/favorites', function (req, res){
  User.findById(req.userId, function (err, user){
    user.toggleFavorite(req.body.favId, function(err){
      user.password = null;
      res.status(err ? 400 : 200).send(err || user);
    })
  });
})

router.post('/admin', function (req, res){
  if (!req.isAdmin) return res.status(403).send('You are not authorized to do this action');
  User.findByIdAndUpdate(req.body.id, {isAdmin: true}, function (err, newAdmin){
    newAdmin.password = null;
    res.status(err ? 400 : 200).send(err || newAdmin);
  })
})

router.put('/', function (req, res){
  console.log(req.userId ===req.body._id)
  if (req.userId === req.body._id || req.isAdmin){
    User.findByIdAndUpdate(req.userId, req.body, function (err, updatedUser){
      updatedUser.password = null;
      res.status(err ? 400 : 200).send(err || updatedUser);
    })
  }else{
    res.status(403).send('You are not authorized to do this action');
  }
})

router.delete('/', function (req, res){
  if (req.userId === req.body._id || req.isAdmin){
    User.findByIdAndRemove(req.body._id, function (err, removedUser){
      res.status(err ? 400 : 200).send(err || 'removed');
    })
  }else{
    res.status(403).send('You are not authorized to do this action');
  }
})

router.post('/avatar', function(req, res){
  console.log("id confirmation", req.userId, Object.keys(req.body.img));
  if (req.userId === req.body._id || req.isAdmin){
    Avatar.create( {img: {data: req.body.img.base64, contentType:'image/png'}} , function(err, newAvatar){
      if (err) return res.status(400).send(err);
      User.findById(req.userId, function(err, user){
        if (err) return res.status(400).send(err);
        user.avatar = newAvatar._id;
        user.save(function(err){
          user.avatar = newAvatar;
          res.status(err ? 400 : 200).send(err || user);
        })
      })
    })
  }else{
    res.status(403).send('You are not authorized to do this action');
  }
})

module.exports = router;
