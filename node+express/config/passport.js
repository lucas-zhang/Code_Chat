var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var Model = require('../models/models');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.userID);
    });

    // used to deserialize the user
    passport.deserializeUser(function(userID, done) {
        new Model.User({userID: userID}).fetch().then(function(err, user) {
            done(err, user);
        });
    });


    //signup strategy
    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, firstName, lastName, email) {
        new Model.User({username: username}).fetch().then(function (err, user) { //not sure if err is a thing
            if (err) {
                return done(err);
            } 
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                var hash = bcrypt.hashSync(password);
                var signUpUser = new Model.User({
                    username: username, 
                    password: hash, 
                    firstName: firstName, 
                    lastName: lastName, 
                    email:email
                });
                signUpUser.save().then(function (err) {
                    if (err){
                        throw err;
                    }
                    return done(null, newUser);

                });
            }
        });
    });

    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        new Model.User({username:username}).fetch().then(function (err, user) {
            if(err) {
                return done(err);
            } 
            if (!user) {
                return done(null, false, req.flash('signupMessage', 'No user found.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Wrong password.'));
            }
            return done(null,user);
        });
    }));

  
};