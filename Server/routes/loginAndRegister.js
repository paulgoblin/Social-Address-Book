'use strict';

const express = require('express')
    , User    = require('../models/userModel');

let router = express.Router();

router.post('/register', (req, res) => {
  User.register(req.body, (err, user) => {
    res.status(err ? 400 : 200)
    .send(err || {token: user.token(), "user":user});
  });
});

router.post('/login', (req, res) => {
  User.login(req.body, (err, user) => {
    res.status(err ? 400 : 200)
    .send(err || {"user": user, token: user.token()});
  });
});

module.exports = router;