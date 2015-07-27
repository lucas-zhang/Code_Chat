//set up crap
//var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 80;
var io = require('socket.io')(http);
var mysql = require('mysql');
//var passport require('passport');

app.use("/bootstrap", express.static(__dirname + '/bootstrap'));
app.use("/assets", express.static(__dirname + '/assets'));
//var LocalStrategy = require('passport-local').Strategy;
/*
//configure the database connection pool
//https://github.com/felixge/node-mysql/#pool-options
var pool = mysql.createPool({
	connectionLimit	: 10, 			
	host			: 'localhost',	
	user			: 'root',
	password		: 'password',
	database		: 'chat'
	
});
*/
/*
//for single connection
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'password',
	database: 'chat'
});*/
/*
//for passport and authentication
passport.use(new LocalStrategy(
	function(username, password, done){
		
		f
	}


))
*/
//set up middleware. Lol no idea what these do.
//app.use(bodyParser.json());       // to support JSON-encoded bodies
//app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  //extended: true
//})); 

app.get('/', function(request, response){
	response.sendFile(__dirname+'/index.html');
});

app.post('/login', function(request, response){
	console.log("POST Received. Body: ", request.body);
	response.redirect('/');
});

/*

//for pooling
function makeUser(){
	pool.getConnection(function(err, connection){
		if(err){
			connection.release();
			res.json({
				"code"	: 100,
				"status": "Error connection to database"
			});
			return;
		}
		
	console.log("connected as id " + connection.threadId);
	
	var data = connection.query("SELECT username, password, email from spooky_users where username = "+"'"+user+"'", function(err, rows, fields){
		if(!err){
			if(rows.length != 0){
				console.log(rows);
			}
		}else{
			return;
		}
		return rows;
	});
	
	connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
	
	});
	
	
	
}



//database connect function
function startConn(err){
	if(err){
		console.log("DATABASE CONNECTION FAILURE");
	}else{
		console.log("DATABASE CONNECTION REGISTERED");
	}
}

//database end function
function endConn(err){
	console.log("DATABASE CONNECTION TERMINATED");
}

//gets one user's data from the db
function getUserData(connection, user){
	connection.connect(startConn);
	var data = connection.query("SELECT username, password, email from spooky_users where username = "+"'"+user+"'", function(err, rows, fields){
		if(!err){
			if(rows.length != 0){
				console.log(rows);
			}
		}else{
			return;
		}
		return rows;
	});
	connection.end(endConn);

	return data;
}

//insert a user
function makeNewUser(connection, username, password, email, first_name, last_name){
	connection.connect(startConn);
	INSERT INTO spooky_users (user_id, username, password, email, first_name, last_name) VALUES ()
	var data = connection.query("SELECT username, password, email from spooky_users where username = "+"'"+user+"'", function(err, rows, fields){
		if(!err){
			if(rows.length != 0){
				console.log(rows);
			}
		}else{
			return;
		}
		return rows;
	});
	connection.end(endConn);

	return data;
	
	
}

//test getUserData
//var lol = getUserData(connection, "zheryu");
//console.log(lol);

*/
/*
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect',function(){
		console.log('user disconnected')
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});
*/
//http.listen(port, function(){
//	console.log("Listening on "+port.toString());
});