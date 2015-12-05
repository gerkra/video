module.exports = function (app) {
    var AuthHandler = require('../handler/auth');
    var auth = new AuthHandler();

    app.get('/', function (req, res, next) {
        res.sendfile('index.html');
    });

    app.get('/login', function (req, res, next) {
        res.render('auth/login.jade');
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
};