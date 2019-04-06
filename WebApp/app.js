// const createError = require('http-errors');
const express = require('express');

// var server = require('http').createServer(app);
// var io = require('socket.io')(3000);


const userRouter = require('./routes/user.js');
const uploads = require('./routes/submission.js');
const location = require('./routes/geolocation.js');
const quiz = require('./routes/quiz.js');
const instance = require('./routes/instance.js');
const team = require('./routes/team.js');
const draganddrop = require('./routes/draganddrop.js');
const narrative = require('./routes/narratives.js');
const add = require('./routes/addElements.js');
const anagram = require('./routes/anagram.js');
const hotspot = require('./routes/hotspot.js');
const del = require('./routes/deleteElements.js');
const edit = require('./routes/editElements.js');
const mission = require('./routes/mission.js');
const wordSearch = require('./routes/wordSearch.js');
const trail = require('./routes/trail.js');
const notification = require('./routes/notification.js');
const summary = require('./routes/summary.js');


// io.on('connection', function(socket){
//     console.log('user connected');
//     io.on('disconnection', function(){
//         console.log('user disconnected')
//     })
// });

// declares the app
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'https://www.amazingtrail.ml');
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Credentials', true);
  next();
});

// declares the routes available
app.use('//user', userRouter);
app.use('//upload', uploads);
app.use('//hotspot', location)
app.use('//quiz', quiz);
app.use('//team', team);
app.use('//', instance);
app.use('//draganddrop', draganddrop);
app.use('//narrative', narrative);
app.use('//add', add);
app.use('//anagram', anagram);
app.use('//hotspot', hotspot);
app.use('//delete', del);
app.use('//edit', edit);
app.use('//mission', mission);
app.use('//wordsearch', wordSearch);
app.use('//trail', trail);
app.use('//notification', notification);
app.use('//summary', summary);

module.exports = app;
