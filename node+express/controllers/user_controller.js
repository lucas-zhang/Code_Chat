var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var UserModel = require('../models/user_model');


var UserController = (function() {
  var loginPostPrivate = function(req, res, next) {
      passport

  };
  var signupPostPrivate = function() {

  };
  var loginPostPrivate = function() {

  };
  var loginPostPrivate = function() {

  };
  return {
      loginPost: function() {
          loginPostPrivate();
      },
      signupPost: function() {
          signupPostPrivate();
      }
  }
  })();

module.exports = UserController;