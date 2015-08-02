
var UserController = require('./controllers/user_controller');

module.exports = function(app, passport) {
	var path = require('path');
	var rootPath = path.join(__dirname + '../..');

	app.get('/', function (req, res) {
	  res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});

	app.post('/login', function (req, res) {
	  res.send('hello');
	  console.log('login hit');
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()){
			return next();
		}
		res.redirect('/');
	}
};






