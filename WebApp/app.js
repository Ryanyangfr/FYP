var createError = require('http-errors');
var express = require('express');

var userRouter = require('./routes/user.js');
var uploads = require('./routes/image.js');
var location = require('./routes/geolocation.js');
var quiz = require('./routes/quiz.js');
var instance = require('./routes/instance.js');
var team = require('./routes/team.js');
var draganddrop = require('./routes/draganddrop.js');
var narrative = require('./routes/narratives.js');
var add = require('./routes/addElements.js');
var anagram = require('./routes/anagram.js');

//declares the app
var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
app.use('/draganddrop', draganddrop);
app.use('/narrative', narrative);
app.use('/add', add);
app.use('/anagram', anagram);

module.exports = app;