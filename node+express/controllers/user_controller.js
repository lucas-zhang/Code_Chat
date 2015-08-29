var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model= require('../models/models');
var UserFactory = require('../factories/user_factory');
var path = require('path');




var UserController = (function() {
  
  var signupGetPrivate = function(req,res) {
    if (req.isAuthenticated()) {
      return renderViewPrivate(req, res, '/home/index.ejs', {errorMessage: null, user: req.user});
    } 
    return renderViewPrivate(req, res, '/signup/signup.ejs', {errorMessage: null, user: null});
  };

  var signupPostPassportPrivate = function(req, res) {
    // factObject.keys()  = [err, user]
    var signupCallBack = function (err, user, info) {
      var templPath = '/signup/signup.ejs'
      if (err) {
        return renderViewPrivate(req, res, templPath, {user: user, errorMessage: err.message});
      }

      if (!user) {
        return renderViewPrivate(req, res, templPath, {user: user, errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
        console.log(user);
        if (err) {
          return renderViewPrivate(req, res, templPath, {user: user, errorMessage: err.message});
        } else {
          console.log('else entered');
          res.redirect('/');
        }
      })
    };

    return passport.authenticate('local-signup', {failureRedirect: '/', failureFlash: true}, signupCallBack)(req, res);

    

  }; 
  var loginPostPassportPrivate = function(req, res) { 
    var loginCallBack = function (err, user, info) {
      console.log('login callback called');
      var templPath = '/home/index.ejs';
      console.log(err);
      console.log(user);
      console.log(info);
      if (err) {
        return renderViewPrivate(req, res, templPath, {user: user, errorMessage: err.message});
      }

      if (!user) {
        console.log('if not user entered');
        return renderViewPrivate(req, res, templPath, {user: user, errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
        console.log(user);
        if (err) {
          return renderViewPrivate(req, res, templPath, {user: user, errorMessage: err.message});
        } else {
          console.log('else entered');
          res.redirect('/');
        }
      })
      
    };
    return passport.authenticate('local-login', {failureRedirect: '/', failureFlash: true}, loginCallBack)(req, res);
    


  };

  var renderViewPrivate = function(req, res, templatePath, ejsDict) {
    var viewsAbsPath = path.join(__dirname, '../../public/views');
    return res.render(path.join(viewsAbsPath, templatePath), ejsDict);
  };
  return {

      loginPostPassport: function(req, res) {
        loginPostPassportPrivate(req , res);
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