'use strict';

const express = require('express');
const User = require('../models/userModel');
const authMiddleware = require('../util/authMiddleware');

let router = express.Router();

router.get('/', function (req, res){
  User.find({}, function (err, users){
    res.status(err ? 400 : 200).send(err || users);
  })
})


module.exports = router;