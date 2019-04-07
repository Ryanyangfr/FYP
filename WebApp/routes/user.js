const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const TokenGenerator = require('uuid-token-generator');
const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const tokenGen = new TokenGenerator();

// for getting all users
router.get('/retrieveAllUser', (req,res) => {
  const query = 'SELECT * FROM PARTICIPANT WHERE TRAIL_INSTANCE_ID = (SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1)';
  conn.query(query, (err,result) => {
    const respond_message = [];
    if (err) {
      res.send('No participants has joined');
    }

    for (let i = 0; i < result.length; i++) {
      respond_message.push({ username: result[i].USERNAME, team: result[i].TEAM_ID, isLeader: result[i].isLeader });
    }

    res.send(JSON.stringify(respond_message));
  });
});

// for registration, Accepts get request
router.post('/register', (req, res) => {
  let currentTrailInstanceIDQuery = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';
  let numUsersEnteredQuery = 'SELECT COUNT(*) AS COUNT FROM PARTICIPANT WHERE TRAIL_INSTANCE_ID = ?';
  let currentNumTeamsQuery = 'SELECT COUNT(*) AS COUNT FROM TEAM WHERE TRAIL_INSTANCE_ID = (SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1)';

  conn.query(currentTrailInstanceIDQuery, (err, trailID) => {
    if (err) {
      console.log(err);
      res.send('failed to update, check parameters');
      return;
    }
    const currTrailInstanceID = trailID[0].TRAIL_INSTANCE_ID;
    conn.query(numUsersEnteredQuery, currTrailInstanceID, (err, data2) => {
      if (err) {
        console.log(err);
        res.send('failed to update, check parameters');
        return;
      }
      const numUsersEntered = data2[0].COUNT;
      conn.query(currentNumTeamsQuery, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const numTeams = data[0].COUNT;
          const username = req.body.username;
          const user_id = numUsersEntered + 1;
          const team_id = numUsersEntered % numTeams + 1;
          // numUsersEntered = numUsersEntered + 1;
          let isLeader = 0;
          if (user_id <= numTeams) {
            isLeader = 1;
          }
          console.log(numTeams);
          const event = {
            team_id: team_id,
            id: crypto.randomBytes(16).toString('hex').substring(0,4)
          };
          const query = 'INSERT INTO PARTICIPANT (USER_ID,USERNAME,TEAM_ID,TRAIL_INSTANCE_ID,isLeader) VALUES (?,?,?,?,?)';
          // updates database
          conn.query(query,[user_id,username,team_id,currTrailInstanceID,isLeader], (err,results) => {
            if (err) {
              console.log(err);
              res.send('failed to update, check parameters');
            } else {
              res.send(event);
            }
          });
        }
      });
    });
  });
});

router.get('/getPassword', cors(), (req,res) => {
  const username = req.query.username;

  const query = 'SELECT USER_PASSWORD FROM ADMIN WHERE USERNAME = ?';

  const token = tokenGen.generate();
    
  conn.query(query, username, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ password: row[0].USER_PASSWORD, token: token });
    }
  });
});

router.post('/changeAdminPassword', cors(), (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const username = req.body.username;
  const newPassword = req.body.password;
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
  const query = 'SELECT USERNAME FROM PARTICIPANT WHERE TRAIL_INSTANCE_ID = (SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1)';
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
