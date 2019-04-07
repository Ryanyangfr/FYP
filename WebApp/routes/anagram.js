const express = require('express');

const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.get('/getAnagrams', (req,res) => {
  const trail_instance_id = req.query.trail_instance_id;
  const query = 'SELECT MISSION_ID, HOTSPOT_NAME FROM TRAIL_HOTSPOT WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ? ORDER BY MISSION_ID)';
  const response = [];

  conn.query(query, trail_instance_id, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      let count = 0;
      rows.forEach((row) => {
        const mission = row.MISSION_ID;
        const hotspot = row.HOTSPOT_NAME;

        mission_query = 'SELECT * FROM ANAGRAM WHERE MISSION_ID = ?';

        conn.query(mission_query, mission, (err, anagram) => {
          if (err) {
            console.log('error: ' + err);
            count += 1;
          } else {
            if (anagram[0] != undefined) {
              const word = anagram[0].ANAGRAM_WORD;
              response.push({hotspot, anagram: word});
            }
            count += 1;
            if (count == rows.length) {
              res.send(response);
            }
          }
        });
      });
    }
  });
});

router.get('/getAllAnagrams', (req,res) => {
  const query = 'SELECT * FROM ANAGRAM, MISSION WHERE ANAGRAM.MISSION_ID = MISSION.MISSION_ID';
  const response = [];

  conn.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.forEach((row) => {
        response.push({id: row.ANAGRAM_ID, word: row.ANAGRAM_WORD, title: row.MISSION_TITLE});
      });
      res.send(response);
    }
  });
});

router.get('/getAnagramsHistory', (req,res) => {
  const trailInstanceID = req.query.trailInstanceID;
  const query = 'SELECT * FROM ANAGRAM_HISTORY, MISSION_HISTORY, SUMMARY_TABLE WHERE ANAGRAM_HISTORY.MISSION_ID = MISSION_HISTORY.MISSION_ID AND ANAGRAM_HISTORY.MISSION_ID = SUMMARY_TABLE.MISSION_ID AND TRAIL_INSTANCE_ID = ?';
  const response = [];

  conn.query(query, trailInstanceID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.forEach((row) => {
        response.push({id: row.ANAGRAM_ID, word: row.ANAGRAM_WORD, title: row.MISSION_TITLE});
      });
      res.send(response);
    }
  });
});

module.exports = router;
