'use strict';

const express = require('express');
const User = require('../models/userModel');
const authMiddleware = require('../util/authMiddleware');

let router = express.Router();

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    res.status(err ? 400 : 200).send(err || users);
  })
})

router.post('/register', (req, res) => {
	User.register(req.body, (err, savedUser) => {
		if (err) return console.log(err);
		console.log(savedUser, 'user registered');
		res.status(err ? 400 : 200).send( err || savedUser);
	})
});

router.post('/update', (req, res) => {
	// update user info
})

module.exports = router;