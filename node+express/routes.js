
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
		console.log('signup post hit');
		var factObj;
		passport.authenticate('local-signup', {failureFlash: true}, function (err, user, info) {
      console.log("Factory signup done");
      factObj = {err: err, user: user};
    })
    console.log(factObj);
    return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});

	app.get('/dbtest', function (req, res) {
		console.log(Model.User);
	 	var signUpUser = new Model.User({
	      username: 'jagger15',
	      password: 'asdf', 
	      firstName: 'john', 
	      lastName: 'smith', 
	      email: 'john_smith@gmail.com'
	  });
	  console.log('hi');
	  signUpUser.save().then(function (user) {
	  	console.log("user saved with dbtest");
	  });
		return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});




	app.post('/login', function (req, res) {	
		UserController.loginPostPassport(req, res);
	});


};






