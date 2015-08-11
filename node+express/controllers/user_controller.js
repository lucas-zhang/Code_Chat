var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model= require('../models/models');
var UserFactory = require('../factories/user_factory');
var path = require('path');




var UserController = (function() {
  var loginPostPrivate = function(req, res, next) {
      

  };
  var signupPostPrivate = function(req, res) {
    var factObj = UserFactory.signupPost(req,res);
    var user = factObj.user;
    var err = factObj.err;
    this.renderView(req, res, '/signup/signup.ejs', {err: err, user: user});

  };

  var signupPostPassportPrivate = function(req, res) {
    var factObject = UserFactory.signupPostPassport(signupCallback);
    if (!factObject.user) {
      return this.renderView(req, res, '/signup/signup.ejs', {signupError: factObject.err.signupMessage});
    }
    return this.renderView(req, res, '/profile/profile.ejs', {user: user});
    

  }; 
  var loginPostPrivate = function() {

  };

  var renderViewPrivate = function(req, res, templatePath, ejsDict) {
    var viewsAbsPath = path.join(__dirname, '../../public/views');
    res.render(path.join(viewsAbsPath, templatePath), ejsDict);
  };
  return {
      loginPost: function(req, res) {
        loginPostPrivate(req, res);
      },
      signupPost: function(req, res) {
        signupPostPrivate(req, res);
      },
      signupPostPassport: function(req,res) {
        signupPostPassportPrivate(req, res);
      },
      signupGet: function(req, res) {
        signupGetPrivate(req,res);
      },
      renderView: function(req, res, templatePath, ejsDict) {
        renderViewPrivate(req, res, templatePath, ejsDict);
      }
  };
})();

module.exports = UserController;