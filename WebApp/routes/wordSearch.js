const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();

const conn = mysql.createConnection(databaseConfig);

router.get('/getWordSearchWords', (req, res) => {
  const trailInstanceID = req.query.trail_instance_id;
  const response = [];

  const query = 'SELECT M.MISSION_ID, HOTSPOT_NAME FROM TRAIL_MISSION AS TM, MISSION AS M, WORDSEARCH AS WS WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TM.MISSION_ID = M.MISSION_ID AND TM.MISSION_ID = WS.MISSION_ID';

  conn.query(query, trailInstanceID, (err, missions) => {
    if (err) {
      console.log(err);
    } else {
      missions.forEach((missionRow) => {
        let mission = missionRow.MISSION_ID;
        // let hotspot_name = missionRow.HOTSPOT_NAME;

        const wordSearchQuery = 'SELECT WORDSEARCH.WORDSEARCH_TITLE, WORD FROM WORDSEARCH, WORDSEARCH_WORD WHERE MISSION_ID = ? AND WORDSEARCH.WORDSEARCH_TITLE = WORD.WORDSEARCH_TITLE';

        conn.query(wordSearchQuery, mission, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let temp = [];
            let currentTitle = data[0].WORDSEARCH_TITLE;
            temp.push({ title: currentTitle });
            data.forEach((wordSearch) => {
              if (currentTitle === wordSearch.WORDSEARCH_TITLE) {
                temp.push(wordSearch.WORD);
              } else {
                response.push({ words: temp });
                temp = [];
                currentTitle = wordSearch.WORDSEARCH_TITLE;
                temp.push({ title: currentTitle });
              }
            });
            console.log(response);
            res.send(response);
          }
        });
      });
    }
  });
});

module.exports = router;
