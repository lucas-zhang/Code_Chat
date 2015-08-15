
var UserController = require('./controllers/user_controller');
var Model = require('./models/models.js');

module.exports = function(app, passport) {
	var path = require('path');
	var rootPath = path.join(__dirname + '../..');

	app.get('/', function (req, res) {
		if (req.isAuthenticated()) {

			return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {user: req.passport.user, err: null});
		}
		console.log("GET to /, not authenticated");
	  return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {user: null, err: null});
	});

	app.get('/signup', function (req, res) {
		UserController.signupGet(req, res);
	});

	app.post('/signup', function (req, res) {
		console.log(passport);
		console.log('signup post hit');
		var factObj;
		passport.authenticate('local-signup', {failureFlash: true}, function (err, user, info) {
      console.log("Factory signup done");
      factObj = {err: err, user: user};
    })

    return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});

	app.get('/dbtest', function (req, res) {
	 	var signUpUser = new Model.User({
	      username: 'jagger156',
	      password: 'asdf', 
	      firstName: 'john', 
	      lastName: 'smith', 
	      email: 'john_smith@gmail.com'
	  });
	 	console.log(signUpUser.get('password'));
	  signUpUser.save().then(function (user) {
	  	console.log(user.get('username'));
	  }).catch(function(e) {
	  	console.log(e);
	  });
		return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});




	app.post('/login', function (req, res) {	
		console.log(passport);
		console.log('login post hit');
		var factObj;
		passport.authenticate('local-login', {failureFlash: true}, function (err, user, info) {
      console.log("Passport authenticate callback called");
      factObj = {err: err, user: user};
    });

    return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});




};






