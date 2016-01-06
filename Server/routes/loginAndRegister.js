'use strict';

const express = require('express')
    , User    = require('../models/userModel');

let router = express.Router();

router.post('/register', (req, res) => {
  User.register(req.body, (err, token) => {
    res.status(err ? 400 : 200)
    .set('Authorization', `Bearer ${token}`)
    .send(err || 'ok');
  });
});

router.post('/login', (req, res) => {
  User.login(req.body, (err, token) => {
    res.status(err ? 400 : 200)
    .set('Authorization', `Bearer ${token}`)
    .send(err || 'ok');
  });
});

module.exports = router;