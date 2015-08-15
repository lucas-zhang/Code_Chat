var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var Model = require('../models/models.js');
var bcrypt   = require('bcrypt-nodejs');
// expose this function to our app using module.exports
module.exports = function(passport) {
    console.log('passport.js initially called');

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.userID);
    });

    // used to deserialize the user
    passport.deserializeUser(function (userID, done) {
        new Model.User({userID: userID}).fetch().then(function(err, user) {
            done(err, user);
        });
    });


    //signup strategy
    passport.use('local-signup', new LocalStrategy({
    },
    function (username, password, done) {
        console.log("local-signup called");
        new Model.User({username: username}).fetch().then(function (user) { //not sure if err is a thing

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                var hash = bcrypt.hashSync(password);
                var signUpUser = new Model.User({
                    username: user.username, 
                    password: hash, 
                    firstName: user.firstName, 
                    lastName: user.lastName, 
                    email: user.email
                });
                signUpUser.save().then(function () {
                    return done(null, signUpUser);

                });
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
    },
    function (username, password, done) {
        console.log('local-login');
        new Model.User({username:username}).fetch().then(function (data) {
            console.log(data);
            var user = data;
            if (!user) {
                return done(null, false, {message: 'Invalid username or password.'});
            }
            if (!bcrypt.compareSync(password, user.get('password'))) {
                return done(null, false, {message: 'Invalid username or password.'});
            }
            return done(null,user);
        });
    }));

  
};