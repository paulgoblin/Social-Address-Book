'use strict';

const express = require('express')
    , User    = require('../models/userModel');

let router = express.Router();

router.post('/register', (req, res) => {
  User.register(req.body, (err, user) => {
    var token = user.token();
    user = user.toObject();
    delete user.password;
    res.status(err ? 400 : 200)
    .send(err || {token: token, "user":user});
  });
});

router.post('/login', (req, res) => {
  User.login(req.body, (err, user) => {
    var token = user.token();
    user = user.toObject();
    delete user.password;
    res.status(err ? 400 : 200)
    .send(err || {token: token, "user":user});
  });
});

module.exports = router;
