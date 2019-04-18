const express = require('express');

const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

// get all mission title and ids for quizzes
// output: [{mission: missionID, title: missionTitle}]                                                                                                    }]
router.get('/getMissionQuiz', (req,res) => {
  const response = [];
  const query = 'SELECT * FROM MISSION WHERE MISSION.MISSION_ID IN (SELECT MISSION_ID FROM QUIZ)';
  conn.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in data) {
        response.push({mission: data[index].MISSION_ID, title: data[index].MISSION_TITLE});
      }
      res.send(response);
    }
  });
});

// gets the quiz for previous trail instances
// input: /api?trailInstanceID=123456
// output: [{mission: missionID, title: missionTitle}]
router.get('/getMissionQuizHistory', (req,res) => {
  const response = [];
  const trailInstanceID = req.query.trailInstanceID;
  // var hotspot = req.query.hotspot;
  const query = 'SELECT * FROM MISSION_HISTORY,SUMMARY_TABLE WHERE MISSION_HISTORY.MISSION_ID IN (SELECT MISSION_ID FROM QUIZ_HISTORY) AND MISSION_HISTORY.MISSION_ID = SUMMARY_TABLE.MISSION_ID AND TRAIL_INSTANCE_ID = ?';
  conn.query(query, trailInstanceID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in data) {
        response.push({mission: data[index].MISSION_ID, title: data[index].MISSION_TITLE});
      }
      console.log(response);
      res.send(response);
    }
  });
});

// get all mission title and ids for wefie
// output: [{mission: missionID, title: missionTitle}]    
router.get('/getMissionWefie', (req,res) => {
  const response = [];
  // var hotspot = req.query.hotspot;
  const query = 'SELECT * FROM MISSION WHERE MISSION.MISSION_ID IN (SELECT MISSION_ID FROM SUBMISSION_QUESTION)';
  conn.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in data) {
        response.push({mission: data[index].MISSION_ID, title: data[index].MISSION_TITLE});
      }
      res.send(response);
    }
  });
});

// get all mission title and ids in the database
// output: [{mission: missionID, title: missionTitle}]    
router.get('/getAllMissions', (req,res) => {
  const response = [];
  // var hotspot = req.query.hotspot;
  const query = 'SELECT * FROM MISSION';
  conn.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in data) {
        response.push({mission: data[index].MISSION_ID, title: data[index].MISSION_TITLE});
      }
      res.send(response);
    }
  });
});
module.exports = router;
