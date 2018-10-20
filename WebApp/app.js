var createError = require('http-errors');
var express = require('express');

var loginRouter = require('./routes/login.js');

var app = express();

app.use('/login', loginRouter);

module.exports = app;