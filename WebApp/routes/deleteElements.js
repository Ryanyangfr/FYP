const express = require('express');

const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/deleteHotspot', (req, res) => {
  const hotspotName = req.body.hotspot_name;

  console.log(hotspotName);
  const query = 'DELETE FROM HOTSPOT WHERE HOTSPOT_NAME = ?';

  conn.query(query, hotspotName, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/deleteNarrative', (req, res) => {
  const narrative_id = req.body.narrative_id;

  console.log(narrative_id);
  const query = 'DELETE FROM NARRATIVE WHERE NARRATIVE_ID = ?';

  conn.query(query, narrative_id, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/deleteQuiz', (req, res) => {
  const mission_id = req.body.mission_id;

  console.log(mission_id);
  const query = 'SELECT QUIZ_ID FROM QUIZ WHERE MISSION_ID = ?';

  conn.query(query, mission_id, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      const deleteOptionsQuery = 'DELETE FROM QUIZ_OPTION WHERE QUIZ_ID = ?';
      const deleteQuizQuery = 'DELETE FROM QUIZ WHERE MISSION_ID = ?';
      const deleteMissionQuery = 'DELETE FROM MISSION WHERE MISSION_ID = ?';

      rows.forEach((row) => {
        conn.query(deleteOptionsQuery, row.QUIZ_ID, (err, data) => {
          if (err) {
            console.log(err);
            res.send(JSON.stringify({ success: 'false' }));
          } else {
            conn.query(deleteQuizQuery, mission_id, (err, data2) => {
              if (err) {
                console.log(err);
                res.send(JSON.stringify({ success: 'false' }));
              } else {
                conn.query(deleteMissionQuery, mission_id, (err, data3) => {
                  if (err) {
                    console.log(err);
                    res.send(JSON.stringify({ success: 'false' }));
                  }
                });
              }
            });
          }
        });
      });
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/deleteWefieQuestion', (req, res) => {
  const wefieID = req.body.id;
  const query = 'DELETE FROM SUBMISSION_QUESTION WHERE QUESTION_ID = ?';
  
  conn.query(query, wefieID, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/deleteParticipant', (req,res) => {
  const userID = req.body.userID;
  const query = 'DELETE FROM PARTICIPANT WHERE USER_ID = ?';

  conn.query(query, userID, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

module.exports = router;
