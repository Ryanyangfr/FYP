var createError = require('http-errors');
var express = require('express');

var userRouter = require('./routes/user.js');
var uploads = require('./routes/image.js');
var location = require('./routes/geolocation.js');
var quiz = require('./routes/quiz.js');

//declares the app
var app = express();

//declares the routes available
app.use('/user', userRouter);
app.use('/upload', uploads);
app.use('/hotspot', location)
app.use('/quiz', quiz);

module.exports = app;