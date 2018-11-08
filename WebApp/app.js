var createError = require('http-errors');
var express = require('express');

var userRouter = require('./routes/user.js');
var uploads = require('./routes/image.js');
var location = require('./routes/geolocation.js');
var quiz = require('./routes/quiz.js');
var instance = require('./routes/instance.js');
var team = require('./routes/team.js');

//declares the app
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//declares the routes available
app.use('/user', userRouter);
app.use('/upload', uploads);
app.use('/hotspot', location)
app.use('/quiz', quiz);
app.use('/team', team);
app.use('/', instance);

module.exports = app;