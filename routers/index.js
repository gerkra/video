module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.sendfile('index.html');
    });
};