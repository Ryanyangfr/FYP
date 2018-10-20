var createError = require('http-errors');
var express = require('express');

var loginRouter = require('./routes/login.js');

//declares the app
var app = express();

//declares the routes available
app.use('/login', loginRouter);

module.exports = app;