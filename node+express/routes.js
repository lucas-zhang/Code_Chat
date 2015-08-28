
var UserController = require('./controllers/user_controller');
var Model = require('./models/models.js');

module.exports = function(app, passport) {
	var path = require('path');
	var rootPath = path.join(__dirname + '../..');

	app.get('/', function (req, res) {
		if (req.isAuthenticated()) {

			return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {user: req.passport.user});
		}
		console.log("GET to /, not authenticated");
	  return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {user: null});
	});

	app.get('/signup', function (req, res) {
		UserController.signupGet(req, res);
	});
	app.post('/signup', function (req, res) {
		console.log('signup post hit');
		UserController.signupPostPassport(req, res);
	});


	
	app.post('/login', function (req, res) {
		
		UserController.loginPostPassport(req, res);
		console.log('login post hit');
		
		passport.authenticate('local-login', {}, function (err, user, info, setFactObj) {
      console.log("Passport authenticate callback called");
      var factObj = {err: err, user: user};
      console.log(factObj);
      setFactObj(factObj);
      
    })(req, res);

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
	  
	  signUpUser.save().then(function (user) {
	  }).catch(function(e) {
	  });
		return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});





};






