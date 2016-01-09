'use strict';

const express = require('express');
const User = require('../models/userModel');

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
    res.status(err ? 400 : 200).send(err || user);
  })
})

router.post('/favorites', function (req, res){
  console.log(req.body, req.userId);
  User.findById(req.userId, function (err, user){
    user.toggleFavorite(req.body.favId, function(err){
      res.status(err ? 400 : 200).send(err || user);
    })
  });
})

router.post('/admin', function (req, res){
  if (!req.isAdmin) return res.status(403).send('You are not authorized to do this action');
  User.findByIdAndUpdate(req.body.id, {isAdmin: true}, function (err, newAdmin){
    res.status(err ? 400 : 200).send(err || newAdmin);
  })
})

router.put('/', function (req, res){
  if (req.userId === req.body._id || req.isAdmin){
    User.findByIdAndUpdate(req.userId, req.body, function (err, updatedUser){
      res.status(err ? 400 : 200).send(err || updatedUser);
    })
  }else{
    res.status(403).send('You are not authorized to do this action');
  }
  // else if (req.isAdmin){
  //   console.log('admin')
  //   User.findByIdAndUpdate(req.body.id, req.body, function (err, updatedUser){
  //     res.status(err ? 400 : 200).send(err || updatedUser);
  //   })
  // }else{
})

router.delete('/', function (req, res){
  if (req.userId === req.body._id){
    console.log('same');
    User.findByIdAndRemove(req.body.id, function (err, removedUser){
      res.status(err ? 400 : 200).send(err || 'removed');
    })
  }else if (req.isAdmin){
    console.log('admin');
    User.findByIdAndRemove(req.body.id, function (err, removedUser){
      res.status(err ? 400 : 200).send(err || 'removed');
    })
  }else{
    res.status(403).send('You are not authorized to do this action');
  }
})

module.exports = router;
