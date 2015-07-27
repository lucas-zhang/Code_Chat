var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var rootPath = __dirname + '../../..'
app.use("/bootstrap", express.static(rootPath + '/bootstrap'));
app.use("/assets", express.static(rootPath + '/frontEnd/assets'));
app.use("/js_modules", express.static(rootPath + '/frontEnd/js_modules'));
app.use(express.static(rootPath + '/frontEnd/html'));


var pool = mysql.createPool({
    connectionLimit : 10,           
    host            : 'localhost',  
    user            : 'root',
    password        : 'lzdbpass',
    database        : 'chat_app'
    
});


app.get('/', function (req, res) {
  res.sendFile(path.join(rootPath + '/frontEnd/html/index.html'));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});