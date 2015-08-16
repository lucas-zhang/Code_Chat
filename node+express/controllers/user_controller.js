var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model= require('../models/models');
var UserFactory = require('../factories/user_factory');
var path = require('path');




var UserController = (function() {
  
  var signupGetPrivate = function(req,res) {
    if (req.isAuthenticated()) {
      return renderViewPrivate(req, res, '/home/index.ejs', {err: null, user: req.passport.user});
    } 
    return renderViewPrivate(req, res, '/signup/signup.ejs', {err: null, user: null});
  };
  var signupPostPrivate = function(req, res) {
    var factObj = UserFactory.signupPost(req,res);
    var user = factObj.user;
    var err = factObj.err;
    return renderViewPrivate(req, res, '/signup/signup.ejs', {err: err, user: user});

  };

  var signupPostPassportPrivate = function(req, res) {
    // factObject.keys()  = [err, user]
    var factObject = UserFactory.signupPostPassport(req, res);
    var err = factObject.err;
    var user = factObject.user;
    if (err || !user) {
      return renderViewPrivate(req, res, '/signup/signup.ejs', {user: null, signupError: err.signupMessage});
    }
    return renderViewPrivate(req, res, '/profile/profile.ejs', {user: user, signupError: null});
    

  }; 
  var loginPostPassportPrivate = function(req, res) { 
    var factObject = UserFactory.loginPostPassport(req, res);
    var err = factObject.err;
    var user = factObject.user;
    if (err || !user) {
      return renderViewPrivate(req, res, '/home/index.ejs', {user: null, loginError: err.loginMessage});
    }
    return renderViewPrivate(req, res, '/profile/profile.ejs', {user: user, loginError: null});
    


  };

  var renderViewPrivate = function(req, res, templatePath, ejsDict) {
    var viewsAbsPath = path.join(__dirname, '../../public/views');
    return res.render(path.join(viewsAbsPath, templatePath), ejsDict);
  };
  return {

      loginPostPassport: function(req, res) {
        loginPostPassportPrivate(req , res);
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