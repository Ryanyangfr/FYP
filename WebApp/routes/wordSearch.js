const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();

const conn = mysql.createConnection(databaseConfig);

router.get('/getWordSearchWords', (req, res) => {
  const trailInstanceID = req.query.trail_instance_id;
  const response = [];

  const query = 'SELECT TH.MISSION_ID, HOTSPOT_NAME FROM TRAIL_HOTSPOT AS TH, WORDSEARCH AS WS WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TH.MISSION_ID = WS.MISSION_ID';

  conn.query(query, trailInstanceID, (err, missions) => {
    if (err) {
      console.log(err);
    } else {
      console.log(missions.length);
      missions.forEach((missionRow) => {
        let mission = missionRow.MISSION_ID;
        let hotspot_name = missionRow.HOTSPOT_NAME;

        const wordSearchQuery = 'SELECT WORDSEARCH.WORDSEARCH_TITLE, WORD FROM WORDSEARCH, WORDSEARCH_WORD WHERE MISSION_ID = ? AND WORDSEARCH.WORDSEARCH_TITLE = WORDSEARCH_WORD.WORDSEARCH_TITLE';

        conn.query(wordSearchQuery, mission, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            // let temp = [];
            let currentTitle = data[0].WORDSEARCH_TITLE;
            // temp.push({ hotspot: hotspot_name });
            let tempWords = [];
            data.forEach((wordSearch) => {
              console.log(wordSearch);
              if (currentTitle === wordSearch.WORDSEARCH_TITLE) {
                tempWords.push(wordSearch.WORD);
              } else {
                // temp.push({ words: tempWords });
                response.push({ hotspot: hotspot_name, words: tempWords, title: currentTitle });
                // temp = [];
                tempWords = [];
                currentTitle = wordSearch.WORDSEARCH_TITLE;
                // temp.push({ title: currentTitle });
              }
            });
            response.push({ hotspot: hotspot_name, words: tempWords, title: currentTitle });
            // temp.push({ words: tempWords });
            // response.push(temp);
            console.log(response);
            res.send(response);
          }
        });
      });

      if (missions.length === 0) {
        res.send([]);
      }
    }
  });
});

router.get('/getAllWordSearchWords', (req,res) => {
  const response = [];
  const wordSearchQuery = 'SELECT WORDSEARCH.WORDSEARCH_TITLE, WORD FROM WORDSEARCH, WORDSEARCH_WORD WHERE WORDSEARCH.WORDSEARCH_TITLE = WORDSEARCH_WORD.WORDSEARCH_TITLE';

  conn.query(wordSearchQuery, mission, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // let temp = [];
      let currentTitle = data[0].WORDSEARCH_TITLE;
      // temp.push({ hotspot: hotspot_name });
      let tempWords = [];
      data.forEach((wordSearch) => {
        console.log(wordSearch);
        if (currentTitle === wordSearch.WORDSEARCH_TITLE) {
          tempWords.push(wordSearch.WORD);
        } else {
          // temp.push({ words: tempWords });
          response.push({ hotspot: hotspot_name, words: tempWords, title: currentTitle });
          // temp = [];
          tempWords = [];
          currentTitle = wordSearch.WORDSEARCH_TITLE;
          // temp.push({ title: currentTitle });
        }
      });
      response.push({ hotspot: hotspot_name, words: tempWords, title: currentTitle });
      // temp.push({ words: tempWords });
      // response.push(temp);
      console.log(response);
      res.send(response);
    }
  });
});
module.exports = router;
