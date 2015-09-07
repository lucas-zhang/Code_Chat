var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model= require('../models/models');
var UserFactory = require('../factories/user_factory');
var path = require('path');




var UserController = (function() {
  
  var signupGetPrivate = function(req,res) {
    if (req.isAuthenticated()) {
      console.log('get to signup authenticated');
      return res.redirect('/');
    } 
    return renderViewPrivate(req, res, '/signup/signup.ejs', {errorMessage: null, user: null});
  };
  var profileGetPrivate = function(req,res) {
    //add some check to make sure the current cookie matches the passport session
    var profileId = req.params.id;
    if (!req.isAuthenticated() ) {
      return res.redirect('/');
    }
    
    // Still in testing 
    /*
    new Model.Subset({id: 42}).fetch({withRelated: ['id']}).then(function(data){
      console.log(data);
    });
*/  

    new Model.Friendship().query({where: {userId1: profileId}, orWhere: {userId2: profileId}}).fetchAll().then(function(data){
      var models = data.models;
      var friendIds = [];
      for (var i = 0; i < models.length; i ++){
        var userId1 = models[i].get('userId1');
        var userId2 = models[i].get('userId2');
        if (userId1 == profileId) {
          friendIds.push(userId2);
        } else {
          friendIds.push(userId1);
        }
        
      }

      var friends = [];
      function getFriendsAndRenderView(i) {
        if (i < friendIds.length){
          new Model.User({userId: friendIds[i]}).fetch().then(function(data){
            friends.push(data);
            getFriendsAndRenderView(i + 1);
          });

        } else {
            var userPromise = UserFactory.getUser(profileId);
            userPromise.then(function(profileUser){
              var isUser = false;
              console.log("username: " + req.params.username);
              console.log(profileUser.get('username'));

              if (req.user.get('userId') == profileUser.get('userId')) {
                isUser = true;
              }
              console.log(friends);
              return renderViewPrivate(req, res, '/profile/profile.ejs', {friends: friends, profileUser: profileUser, isUser: isUser});
            });
        }
      }

      getFriendsAndRenderView(0);
      
    });

  

  };
  var addFriendPrivate = function(req, res){
    //do some checking to make sure that inputted friendId is tampered with
    var friendId = req.body.friendId;
    if (req.user.get('userId') == friendId){
      return res.send("You can't add yourself as a friend!");
    }
    new Model.Friendship({userId1: req.user.get('userId'), userId2: friendId}).save().then(function(data){
      console.log("entered then");
      return res.send("You've successfully added this person as a friend!");
    }).catch(function(e){
      console.log("entered catch");
      return res.send("There was an error trying to add this person to your friends list.");
    });

  }

  var searchGetPrivate = function(req, res) {
    if (req.isAuthenticated()) {
      return renderViewPrivate(req, res, '/search/search.ejs', {});
    } else {
      res.redirect('/');
    }
    
  }
  var searchPostPrivate = function(req, res){
    var inputFirstName = req.body.firstName;
    var inputLastName = req.body.lastName;
    var matchingUsers = [];
    new Model.User().fetchAll().then(function(data){
      var users = data.models;
      for (var i = 0; i < users.length; i ++) {
        var fNameMatch = users[i].get('firstName').search(new RegExp(inputFirstName, "i")) != -1;
        var lNameMatch = users[i].get('lastName').search(new RegExp(inputLastName, "i")) != -1;
        if (fNameMatch || lNameMatch) {
          matchingUsers.push(users[i]);
        }
      }
      return res.send(JSON.stringify({matchingUsers: matchingUsers}));
    });
  }

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
      req.logIn(user, function(err) {
        if (err) {
          return renderViewPrivate(req, res, templPath, {user: user, errorMessage: err.message});
        } else {

          return res.redirect('/');
        }
      })
    };

    return passport.authenticate('local-signup', {failureRedirect: '/', failureFlash: true}, signupCallBack)(req, res);

    

  }; 
  var loginPostPassportPrivate = function(req, res) { 
    var loginCallBack = function (err, user, info) {
      console.log('login callback called');
      var templPath = '/home/index.ejs';

      if (err) {
        return renderViewPrivate(req, res, templPath, {user: user, errorMessage: err.message});
      }

      if (!user) {
        return renderViewPrivate(req, res, templPath, {user: user, errorMessage: info.message});
      }
      return req.logIn(user, function(err) {

        if(err) {
          return renderViewPrivate(req, res, templPath, {user: user, errorMessage: err.message});
        } else {
          console.log(user.get('firstName'));
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
      profileGet: function(req, res) {
        profileGetPrivate(req, res);
      },
      addFriend: function(req, res) {
        addFriendPrivate(req, res);
      },
      searchGet: function(req, res) {
        searchGetPrivate(req, res);
      },
      searchPost: function(req, res) {
        searchPostPrivate(req, res);
      },
      renderView: function(req, res, templatePath, ejsDict) {
        renderViewPrivate(req, res, templatePath, ejsDict);
      }
  };
})();

module.exports = UserController;