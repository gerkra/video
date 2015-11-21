var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var server;

app.use(express.static(__dirname + '/public'));

require('./routers/index')(app);

server = http.createServer(app);

server.listen(8888, function () {
    console.log('Server started on port 8888');
});