const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const crypto = require('crypto');
const TokenGenerator = require('uuid-token-generator');
const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const tokenGen = new TokenGenerator();

const pusher = new Pusher({
  appId: '650737',
  key: '1721c662be60b9cbd43c',
  secret: 'a14c63eaaa50c1a466ca',
  cluster: 'ap1',
  encrypted: true
});

const channel = 'events_to_be_shown';

let numUsersEntered = 0;
// checks if user is valid
// router.get('/loginCheck/', function(req,res){
//     // console.log(req.query.password);
//     //implicit connection to database
//     //executes query below
//     conn.query("Select USER_PASSWORD from Participants where USER_NAME=?", req.query.username, function(err, result, fields){
//         if (err){
//             //response when there is an error
//             res.send('username or password is wrong');
//         }`
//         // console.log(result)
//         //getting the password from the database output
//         var password = result[0].USER_PASSWORD;
//         // console.log("pass: " + password);
//         // checks if passwords are the same
//         if(password === req.query.password){
//             res.send('valid');
//         }else{
//             res.send('username or password is wrong');
//         }
//     })
// })

// for getting all users
router.get('/retrieveAllUser', (req,res) => {
  const query = 'SELECT * FROM PARTICIPANT';
  console.log('User registered');
  conn.query(query, (err,result) => {
    const respond_message = [];
    if (err) {
      res.send('No participants has joined');
    }

    for (let i = 0; i < result.length; i++) {
      respond_message.push({ username: result[i].USERNAME, team: result[i].TEAM_ID, isLeader: result[i].isLeader });
    }

    console.log(respond_message);
    res.send(JSON.stringify(respond_message));
  });
});

// for registration, Accepts get request
router.post('/register', (req, res) => {
  // gets parameters from post request
  // console.log(req.body);
  let currentNumTeamsQuery = 'SELECT COUNT(*) AS COUNT FROM TEAM WHERE TRAIL_INSTANCE_ID = (SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1)'

  conn.query(currentNumTeamsQuery, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const numTeams = data.COUNT;
      const username = req.body.username;
      const user_id = numUsersEntered + 1;
      const team_id = numUsersEntered % numTeams + 1;
      numUsersEntered = numUsersEntered + 1;
      let isLeader = 0;
      if (user_id <= 3) {
        isLeader = 1;
      }
      const event = {
        team_id: team_id,
        id: crypto.randomBytes(16).toString('hex').substring(0,4),
      };

      // console.log('request: ' + req);
      // console.log('*****************************************************************')
      // console.log('body: ' + req.body)
      // console.log('*****************************************************************')

      console.log(`username: ${username}`);
      console.log(`user_id: ${user_id}`);
      console.log(`team: ${team_id}`);
      console.log(`user entered: ${numUsersEntered}`);
      const query = 'INSERT INTO PARTICIPANT (USER_ID,USERNAME,TEAM_ID, isLeader) VALUES (?,?,?,?)';
      // updates database
      conn.query(query,[user_id,username,team_id, isLeader], (err,results) => {
        if (err) {
          console.log(err);
          res.send('failed to update, check parameters');
        } else {
          pusher.trigger(channel, 'created', event);
          res.send(event);
        }
      });
    }
  })

  
});

router.get('/getPassword', cors(), (req,res) => {
  const username = req.query.username;

  const query = 'SELECT USER_PASSWORD FROM ADMIN WHERE USERNAME = ?';

  const token = tokenGen.generate();

  console.log(token);
    
  conn.query(query, username, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log('password sent');
      res.send({ password: row[0].USER_PASSWORD, token: token });
    }
  });
});

router.post('/changeAdminPassword', cors(), (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const username = req.body.username;
  const newPassword = req.body.password;

  console.log('sent');
  const query = 'UPDATE ADMIN SET USER_PASSWORD = ? WHERE USERNAME = ?';

  conn.query(query, [newPassword, username], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ status: 'failed' }));
    } else {
      console.log('password updated');
      res.send(JSON.stringify({ status: 'success' }));
    }
  });
});

router.get('/retrieveAllUsers',(req,res) => {
  const query = 'SELECT USERNAME FROM PARTICIPANT';
  const response = [];
  console.log('retrieveAllUsers called');

  conn.query(query, (err, rows) => {
    if (err) {
      console.log(error);
    }
    rows.forEach((row) => {
      response.push(row.USERNAME);
    });

    res.send(JSON.stringify({ username: response }));
  });
});

module.exports = router;