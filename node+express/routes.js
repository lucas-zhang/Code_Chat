
var UserController = require('./controllers/user_controller');
var Model = require('./models/models.js');

module.exports = function(app, passport) {
	var path = require('path');
	var rootPath = path.join(__dirname + '../..');

	app.get('/', function (req, res) {
		console.log('index get called');
		if (req.isAuthenticated()) {
			console.log()
			console.log("GET to /, authenticated");
			return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {user: req.user, errorMessage:null});
		}
		console.log("GET to /, not authenticated");
	  return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {user: null, errorMessage: null});
	});

	app.post('/', function (req, res) { // login
		console.log('login post hit');
		UserController.loginPostPassport(req, res);
	});
	app.get('/getUser', function (req, res) {
		userId = req.body.userId;
		if (userId != req.user.get('userId')) {
			req.logout();
			return res.redirect('/');
		}
		if (req.isAuthenticated()) {
			return req.user;
		} else {
			return null;
		}
	});


	app.get('/signup', function (req, res) {
		UserController.signupGet(req, res);
	});
	app.post('/signup', function (req, res) {
		console.log('signup post hit');
		UserController.signupPostPassport(req, res);
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});


	


	app.get('/dbtest', function (req, res) {
	 	var signUpUser = new Model.User({
	      username: 'jagger156',
	      password: 'asdf', 
	      firstName: 'john', 
	      lastName: 'smith', 
	      email: 'john_smith@gmail.com'
	  });
	  
	  signUpUser.save().then(function (user) {
	  }).catch(function(e) {
	  });
		return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});



};






