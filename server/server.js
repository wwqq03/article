var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var md5 = require('MD5');

var Users = require('./db').USERS;

var events = require('./routes/events');
var articles = require('./routes/articles');

var SECRET = '5uccftG6J6-8iP)6(-dORmFm],^64Rfk$r+;?Z*@sW$jZtamro?tD?b5$4]uL-em';

var app = express();

var debug = require('debug')('server');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', expressJwt({secret: SECRET}));
app.use('/api/events', events);
app.use('/api/articles', articles);

//Authenticate
app.post('/auth', function (req, res) {
    //if is invalid, return 401
    var username = req.body.username;
    var password = req.body.password;
    if(!username || !password) {
        res.send(401, 'Wrong user or password');
        return;
    }
    Users.findOne({'username': username, password: md5(password)}, function(err, user) {
        if(err || !user) {
            res.send(401, 'Wrong user or password');
            return;
        }
        var profile = {
            username: username,
            role: user.role
        };

        var token = jwt.sign(profile, SECRET);

        res.json({token: token, profile: profile});
    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;
