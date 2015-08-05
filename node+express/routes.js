
var UserController = require('./controllers/user_controller');

module.exports = function(app, passport) {
	var path = require('path');
	var rootPath = path.join(__dirname + '../..');

	app.get('/', function (req, res) {
	  res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});

	app.get('/signup', function (req, res) {
		UserController.renderView(req,res,'/signup/signup.ejs',{});
	});

	app.post('/signup', function (req, res) {
		UserController.signupPostPassport(req, res);
	});

	app.post('/login', function (req, res) {
	  res.send('hello');
	  console.log('login hit');
	});


};






