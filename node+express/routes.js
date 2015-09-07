var UserController = require('./controllers/user_controller');
var Model = require('./models/models.js');

module.exports = function(app, passport) {
	var path = require('path');
	var rootPath = path.join(__dirname + '../..');
	var rooms = [];
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
			console.log(user);
	  }).catch(function(e) {
			console.log(e);
	  });
		return res.render(path.join(rootPath, '/public/views/home/index.ejs'), {});
	});
	
	app.get('/select_room', function(req, res){
		return res.sendFile(path.join(rootPath, '/public/views/chat/select_room.html'));
	});
	app.post('/select_room', function(req, res){
		if(rooms.indexOf(req.body.room) === -1){
		rooms.push(req.body.room);
	}
	res.redirect('/room/'+req.body.room);
		
	});
	
	app.get('/room/*', function(req, res){
		return res.sendFile(path.join(rootPath, '/public/views/chat/chatroom.html'));
	});

	
};






