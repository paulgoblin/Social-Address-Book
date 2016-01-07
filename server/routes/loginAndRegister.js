'use strict';

const express = require('express')
    , User    = require('../models/userModel');

let router = express.Router();

router.post('/register', (req, res) => {
  User.register(req.body, (err, savedUser) => {
  	console.log(savedUser, 'user registered');
    res.status(err ? 400 : 200)
    .send(err || { token: savedUser.token(), "user": savedUser });
  });
});

router.post('/login', (req, res) => {
  User.login(req.body, (err, user) => {
    res.status(err ? 400 : 200)
    .send(err || { "user": user, token: user.token() });
  });
});

module.exports = router;