var SessionHandler = require('../helpers/session');
var session = new SessionHandler();

module.exports = function () {
    var Auth = {};

    Auth.login = function (req, res, next) {
        session.register(req, res, next);
    };

    Auth.logout = function (req, res, next) {
        session.kill(req, res, next);
    };

    return Auth;
};