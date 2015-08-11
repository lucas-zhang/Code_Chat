
var UserController = require('./controllers/user_controller');

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
		UserController.signupPostPassport(req, res);
	});

	app.post('/login', function (req, res) {	
		UserController.loginPostPassport(req, res);
	});


};






