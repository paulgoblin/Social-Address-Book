'use strict';

module.exports = {
  expTime: {num: 7, unit: 'days'},
  refreshToken: false,
  saltRounds: 10,
  validatePassword: (password) => {
  	// input password validation
    return true;
  },
  validateUsername: (username) => {
  	// input username validation
    return true;
  }
};