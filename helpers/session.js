module.exports = function () {
    var Session = {};

    Session.register = function (req, res, next) {
        req.session.name = 'Герман';
        req.session.userId = 1;
        req.session.userIp = req.ip;
        res.status(200).send('Login success!');
    };

    Session.kill = function (req, res, next) {
        req.session.destroy();
        res.status(200).send('Logout success!');
    };

    Session.isAuthorized = function (req, res, next) {
        if (req.session && req.session.name) {
            res.status(200).send('User is authorized!');
        } else {
            res.status(401).send('User is unauthorized!');
        }
    };

    Session.isAuthenticated = function (req, res, next) {

    };

    return Session;
};