module.exports = function (app) {
    var AuthHandler = require('../handler/auth');
    var auth = new AuthHandler();

    app.get('/', function (req, res, next) {
        res.sendfile('index.html');
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
};