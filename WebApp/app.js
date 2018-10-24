var createError = require('http-errors');
var express = require('express');

var userRouter = require('./routes/user.js');
var uploads = require('./routes/image.js');

//declares the app
var app = express();

//declares the routes available
app.use('/user', userRouter);
app.use('/upload', uploads);

module.exports = app;