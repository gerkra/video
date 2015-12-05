var express = require('express');
var session = require('express-session');
var http = require('http');
var bodyParser = require('body-parser');
var compression = require('compression');
var sockets = require('socket.io');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var server;
var io;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json({limit: 1024 * 1024 * 5}));
app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 100}));
app.use(compression());

app.use(session({
    name: 'VideoSessionGK',
    key: 'video.session.gk',
    secret: process.env.SESSION_SECRET || '1q2w3e4r5t6y7u8i9o0pgerkraghbitk',
    resave: true,
    saveUninitialized: true
}));

require('./config/development');

var mongoConnectionOptions = {
    db: {native_parser: true},
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    w: 1,
    j: true
};

var mongoDB = mongoose.createConnection(process.env.MongoDB_HOST, process.env.MongoDB_NAME, process.env.MongoDB_PORT, mongoConnectionOptions);

mongoDB.on('error', console.error.bind(console, 'Mongo Database connection error:'));
mongoDB.once('open', function callback() {
    console.log('Mongo Database connection success!!!');

    require('./routers/index')(app);

    server = http.createServer(app);

    io = sockets(server);

    io.on('connection', function (socket) {
        socket.on('event', function (data) {
        });

        socket.on('new_message', function (data) {
            console.log(data);

            io.sockets.emit('submit_message', data);
        });

        socket.on('disconnect', function () {
        });
    });

    server.listen(8888, function () {
        console.log('Server started on port 8888');
    });
});