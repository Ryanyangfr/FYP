const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const router = express.Router();
const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/editHotspot', (req, res) => {
  console.log('edit hotspot called');
  const hotspotName = req.body.hotspot_name;
  const latitude = req.body.latitude;
  const longtitude = req.body.longtitude;

  const query = 'UPDATE HOTSPOT SET LATITUDE = ?, LONGTITUDE = ? WHERE HOTSPOT_NAME = ?';

  conn.query(query, [latitude, longtitude, hotspotName], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/editNarrative', (req, res) => {
  const narrative_id = req.body.narrative_id;
  const narrative = req.body.narrative;

  const query = 'UPDATE NARRATIVE SET NARRATIVE = ? WHERE NARRATIVE_ID = ?';

  conn.query(query, [narrative, narrative_id], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/editQuiz', (req, res) => {

  const quiz = req.body.quiz;
  const missionID = req.body.missionID;
  const title = req.body.title;
  const doneArray = [];
  const query = 'UPDATE MISSION SET MISSION_TITLE = ? WHERE MISSION_ID = ?';

  conn.query(query, [title, missionID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    }
  });
  let totalCount = 0;

  quiz.forEach((row) => {
    totalCount += row.options.length;
  });
  quiz.forEach((row) => {
    const quizID = row.quiz_id;
    const quiz_question = row.quiz_question;
    const quiz_options = row.options;
    const quiz_answer = row.quiz_answer;

    updateQuiz(quizID, quiz_answer, quiz_question, quiz_options, res, doneArray, totalCount);
  });
});

router.post('/editWefieQuestion', (req, res) => {
  const questionID = req.body.id;
  const question = req.body.question;

  const query = 'UPDATE SUBMISSION_QUESTION SET QUESTION = ? WHERE QUESTION_ID = ?';

  conn.query(query, [question, questionID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/switchTeams', (req,res) => {
  const userID = req.body.userID;
  const newTeam = req.body.newTeam;

  const query = 'UPDATE PARTICIPANT SET TEAM_ID = ? WHERE USER_ID = ?';

  conn.query(query, [newTeam, userID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/editDragAndDrop', (req,res) => {

  const id = req.body.id;
  const question = req.body.question;
  const options = req.body.options;
  const title = req.body.title;
  const missionID = req.body.missionID;

  const updateMission = 'UPDATE MISSION SET MISSION_TITLE = ? WHERE MISSION_ID = ?';
  const updateDragAndDrop = 'UPDATE DRAG_AND_DROP SET DRAGANDDROP_QUESTION = ? WHERE DRAGANDDROP_ID = ?';
  const deleteOptions = 'DELETE FROM DRAG_AND_DROP_OPTION WHERE DRAGANDDROP_ID = ?';
  const addOptions = 'INSERT INTO DRAG_AND_DROP_OPTION VALUES (?,?,?)';

  conn.query(updateMission, [title, missionID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      conn.query(updateDragAndDrop, [question, id], (err, data2) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          conn.query(deleteOptions, id, (err, data3) => {
            if (err) {
              console.log(err);
              res.send(JSON.stringify({ success: 'false' }));
            } else {
              let counter = 0;
              options.forEach((option) => {
                const qn_option = option.option;
                const qn_answer = option.answer;
                conn.query(addOptions, [id, qn_option, qn_answer], (err, data2) => {
                  if (err) {
                    console.log(err);
                    res.send(JSON.stringify({ success: 'false' }));
                  } else {
                    counter += 1;
                    if (counter === options.length) {
                      res.send(JSON.stringify({ success: 'true' }));
                    }
                  }
                });
              });
            }
          });
        }
      });
    }
  });
});

router.post('/editDrawingQuestion', (req, res) => {
  const questionID = req.body.id;
  const question = req.body.question;

  const query = 'UPDATE DRAWING_QUESTION SET QUESTION = ? WHERE QUESTION_ID = ?';

  conn.query(query, [question, questionID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});


/****************************************************************************************************Utility Methods ************************************************************************************************************************* */

function updateQuiz(quizID, answer, question, options, res, doneArray, counter) {
  const updateQnQuery = 'UPDATE QUIZ SET QUIZ_QUESTION = ?, QUIZ_ANSWER = ? WHERE QUIZ_ID = ?';

  conn.query(updateQnQuery, [question, answer, quizID], (err, result) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
      anyErr = true;
    } else {
      const updateOptionQuery = 'UPDATE QUIZ_OPTION SET QUIZ_OPTION = ? WHERE QUIZ_OPTION_ID = ? AND QUIZ_ID = ?';
      
      options.forEach((option) => {
        conn.query(updateOptionQuery, [option.option, option.option_id, quizID], (err, data) => {
          if (err) {
            console.log(err);
            res.send(JSON.stringify({ success: 'false' }));
            anyErr = true;
            count += 1;
          } else {
            count += 1;
            doneArray.push("done");
            if (doneArray.length === counter) {
              res.send(JSON.stringify({ success: 'true' }));
            }
          }
        });
      });
    }
  });
}
/** **********************************************************************End Method ****************************************************************** */
router.post('/editAnagram', (req, res) => {
  const anagramID = req.body.id;
  const word = req.body.word;

  const query = 'UPDATE ANAGRAM SET ANAGRAM_WORD = ? WHERE ANAGRAM_ID = ?';

  conn.query(query, [word, anagramID], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/editWordsearch', (req,res) => {
  const wordSearchID = req.body.id;
  const words = req.body.words;

  const deleteQuery = 'DELETE FROM WORDSEARCH_WORD WHERE WORDSEARCH_ID = ?';
  const insertQuery = 'INSERT INTO WORDSEARCH_WORD VALUES (?,?)';

  conn.query(deleteQuery, wordSearchID, (err,data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      let count = 0;
      words.forEach((word) => {
        conn.query(insertQuery, [wordSearchID, word], (err, data2) => {
          if (err) {
            console.log(err);
            res.send(JSON.stringify({ success: 'false' }));
          } else {
            count += 1;
            if (count === words.length) {
              res.send(JSON.stringify({ success: 'true' }));
            }
          }
        });
      });
    }
  });
});
module.exports = router;
