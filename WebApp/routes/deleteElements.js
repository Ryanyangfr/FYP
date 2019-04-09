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

  const query = 'SELECT QUIZ_ID FROM QUIZ WHERE MISSION_ID = ?';

  conn.query(query, mission_id, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      const deleteOptionsQuery = 'DELETE FROM QUIZ_OPTION WHERE QUIZ_ID = ?';
      const deleteQuizQuery = 'DELETE FROM QUIZ WHERE MISSION_ID = ?';
      const deleteMissionQuery = 'DELETE FROM MISSION WHERE MISSION_ID = ?';
      let count = 0;
      let anyErr = false;

      rows.forEach((row) => {
        conn.query(deleteQuizQuery, mission_id, (err, data3) => {
          if (err) {
            console.log(err);
            if (anyErr !== true) {
              anyErr = true;
              res.send(JSON.stringify({ success: 'false' }));
            }
          } else {
            conn.query(deleteOptionsQuery, row.QUIZ_ID, (err, data2) => {
              if (err) {
                console.log(err);
                if (anyErr !== true) {
                  anyErr = true;
                  res.send(JSON.stringify({ success: 'false' }));
                }
              } else {
                conn.query(deleteMissionQuery, mission_id, (err, data) => {
                  if (err) {
                    console.log(err);
                    if (anyErr !== true) {
                      anyErr = true;
                      res.send(JSON.stringify({ success: 'false' }));
                    }
                  }
                  count += 1;
                  if (count === rows.length && anyErr !== true) {
                    res.send(JSON.stringify({ success: 'true' }));
                  }
                });
              }
            });
          }
        });
      });
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

router.post('/deleteDragAndDrop', (req,res) => {
  const id = req.body.id;
  const missionID = req.body.missionID;
  const query = 'DELETE FROM DRAG_AND_DROP WHERE DRAGANDDROP_ID = ?';
  const optionQuery = 'DELETE FROM DRAG_AND_DROP_OPTION WHERE DRAGANDDROP_ID = ?';
  const deleteFromMissionQuery = 'DELETE FROM MISSION WHERE MISSION_ID = ?';

  conn.query(optionQuery, id, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      conn.query(query, id, (err, data2) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          conn.query(deleteFromMissionQuery, missionID, (err, data3) => {
            if (err) {
              console.log(err);
              res.send(JSON.stringify({ success: 'false' }));
            } else {
              res.send(JSON.stringify({ success: 'true' }));
            }
          })
        }
      })
    }
  })
})

router.post('/deleteDrawingQuestion', (req, res) => {
  const drawingID = req.body.id;
  const query = 'DELETE FROM DRAWING_QUESTION WHERE QUESTION_ID = ?';

  conn.query(query, drawingID, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/deleteAnagram', (req, res) => {
  const anagramID = req.body.id;
  const query = 'DELETE FROM ANAGRAM WHERE ANAGRAM_ID = ?';

  conn.query(query, anagramID, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/deleteWordsearch', (req, res) => {
  const wordSearchID = req.body.id;
  const wordSearchQuery = 'DELETE FROM WORDSEARCH WHERE WORDSEARCH_ID = ?';
  const wordSearchWordQuery = 'DELETE FROM WORDSEARCH_WORD WHERE WORDSEARCH_ID = ?';

  conn.query(wordSearchWordQuery, wordSearchID, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      conn.query(wordSearchQuery, wordSearchID, (err,data) => {
        if (err) {
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          res.send(JSON.stringify({ success: 'true' }));
        }
      })
    }
  })
})
module.exports = router;
