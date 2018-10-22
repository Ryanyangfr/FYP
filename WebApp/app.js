var createError = require('http-errors');
var express = require('express');

var userRouter = require('./routes/user.js');

//declares the app
var app = express();

//declares the routes available
app.use('/user', userRouter);

module.exports = app;