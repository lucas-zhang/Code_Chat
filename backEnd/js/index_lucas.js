var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');



var pool = mysql.createPool({
    connectionLimit : 10,           
    host            : 'localhost',  
    user            : 'root',
    password        : 'lzdbpass',
    database        : 'chat_app'
    
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});