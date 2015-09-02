var Model = require('../models/models.js');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

var UserFactory = {
  fieldsFull: function(user) {
    for (var field in user) {
      if(req.hasOwnProperty(field)) {
        if(field.length == 0) {
          return false;
        }
      }
    }
    return true;
  },
  validEmail: function(email) {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email);
  },
  getUser: function(userId) {
    return new Model.User({userId: userId}).fetch();
  }

  
};
module.exports = UserFactory;

  /*this.signupPost = function(req, res) {
    var user = req.body;
    var usernamePromise = null;
    var returnObject = {'err': null, 'user': null};


    if (!this.fieldFull(user)) {
      returnObject.err = 'You must fill in all fields!';
      return returnObject;
    }

    if (user.password !== user.password2) {
      returnObject.err = 'The passwords you\'ve entered don\'t match!';
      return returnObject;
    }

    if (!this.validEmail(req.email)) {
      returnObject.err = 'The email address you\'ve entered isn\'t valid!';
      return returnObject;
    }

    usernamePromise = new Model.User({username: user.username}).fetch();
    usernamePromise.catch(function(error) {
      console.log('Database error from factory signupPost when fetching usernamePromise');
      returnObject.err = error; 
    });
    usernamePromise.then(function(user_row)) {

      if(user_row) {
        returnObject.err = 'The username you\'ve chosen is already taken!';
      } else {
        var password = user.password;
        var hash = bcrypt.hashSync(password);
        var signupUser =  new Model.User({username: user.username, password: hash, email: user.email, firstName: user.firstName, lastName: user.lastName});
        signupUser.save().catch(function(error) {
          console.log('Database error from factory signupPost when saving signupUser');
        });
        returnObject.user = signupUser;
      }
    };

    return returnObject;
  }; */

