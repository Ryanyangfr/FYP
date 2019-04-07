const express = require('express');
const mysql = require('mysql');
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
      missions.forEach((missionRow) => {
        let mission = missionRow.MISSION_ID;
        let hotspot_name = missionRow.HOTSPOT_NAME;

        const wordSearchQuery = 'SELECT WORDSEARCH.WORDSEARCH_ID, WORD FROM WORDSEARCH, WORDSEARCH_WORD WHERE MISSION_ID = ? AND WORDSEARCH.WORDSEARCH_ID = WORDSEARCH_WORD.WORDSEARCH_ID';

        conn.query(wordSearchQuery, mission, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let currentID = data[0].WORDSEARCH_ID;
            let tempWords = [];
            data.forEach((wordSearch) => {
              if (currentID === wordSearch.WORDSEARCH_ID) {
                tempWords.push(wordSearch.WORD);
              } else {
                response.push({ hotspot: hotspot_name, words: tempWords });
                tempWords = [];
                currentID = wordSearch.WORDSEARCH_ID;
              }
            });
            response.push({ hotspot: hotspot_name, words: tempWords });
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
  const wordSearchQuery = 'SELECT WORDSEARCH.WORDSEARCH_ID, WORD, MISSION_TITLE FROM WORDSEARCH, WORDSEARCH_WORD, MISSION WHERE WORDSEARCH.WORDSEARCH_ID = WORDSEARCH_WORD.WORDSEARCH_ID AND MISSION.MISSION_ID = WORDSEARCH.MISSION_ID';

  conn.query(wordSearchQuery, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // let temp = [];
      if (data.length === 0) {
        res.send(response);
        return;
      }
      let currentID = data[0].WORDSEARCH_ID;
      let currentTitle = data[0].MISSION_TITLE;
      let tempWords = [];
      data.forEach((wordSearch) => {
        if (currentID === wordSearch.WORDSEARCH_ID) {
          tempWords.push(wordSearch.WORD);
        } else {
          response.push({ words: tempWords, id: currentID, title: currentTitle });
          tempWords = [];
          tempWords.push(wordSearch.WORD);
          currentID = wordSearch.WORDSEARCH_ID;
          currentTitle = wordSearch.MISSION_TITLE;
        }
      });
      response.push({ words: tempWords, id: currentID, title: currentTitle });
      res.send(response);
    }
  });
});

router.get('/getWordSearchWordsHistory', (req,res) => {
  const response = [];
  const trailInstanceID = req.query.trailInstanceID;
  const wordSearchQuery = 'SELECT WORDSEARCH_HISTORY.WORDSEARCH_ID, WORD, MISSION_TITLE FROM WORDSEARCH_HISTORY, WORDSEARCH_WORD_HISTORY, MISSION_HISTORY, SUMMARY_TABLE WHERE WORDSEARCH_HISTORY.WORDSEARCH_ID = WORDSEARCH_WORD_HISTORY.WORDSEARCH_ID AND MISSION_HISTORY.MISSION_ID = WORDSEARCH_HISTORY.MISSION_ID AND SUMMARY_TABLE.MISSION_ID = WORDSEARCH_HISTORY.MISSION_ID AND TRAIL_INSTANCE_ID = ?';

  conn.query(wordSearchQuery, trailInstanceID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length === 0) {
        res.send(response);
        return;
      }
      let currentID = data[0].WORDSEARCH_ID;
      let currentTitle = data[0].MISSION_TITLE;
      let tempWords = [];
      data.forEach((wordSearch) => {
        if (currentID === wordSearch.WORDSEARCH_ID) {
          tempWords.push(wordSearch.WORD);
        } else {
          response.push({ words: tempWords, id: currentID, title: currentTitle });
          tempWords = [];
          tempWords.push(wordSearch.WORD);
          currentID = wordSearch.WORDSEARCH_ID;
          currentTitle = wordSearch.MISSION_TITLE;
        }
      });
      response.push({ words: tempWords, id: currentID, title: currentTitle });
      res.send(response);
    }
  });
});
module.exports = router;
