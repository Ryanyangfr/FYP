const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const router = express.Router();
const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/editHotspot', (req,res) => {
  const hotspotName = req.body.hotspot_name;
  const latitude = req.body.latitude;
  const longtitude = req.body.longtitude;
  const narrative_id = req.body.narrative_id;

  // console.log(req.body);

  console.log(hotspotName);
  console.log(latitude);
  console.log(longtitude);
  console.log(narrative_id);

  const query = 'UPDATE HOTSPOT SET LATITUDE = ?, LONGTITUDE = ?, NARRATIVE_ID = ? WHERE HOTSPOT_NAME = ?';

  conn.query(query,[latitude,longtitude,narrative_id,hotspotName], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/editNarrative', (req,res) => {
  const narrative_id = req.body.narrative_id;
  const narrative = req.body.narrative;

  console.log(req.body);
  const query = 'UPDATE NARRATIVE SET NARRATIVE = ? WHERE NARRATIVE_ID = ?';

  conn.query(query,[narrative, narrative_id], (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/editQuiz', (req,res) => {
  const quizID = req.body.question.value;
  const question = req.body.question.label;

  const option1 = req.body.option1.option;
  const option1ID = req.body.option1.id;

  const option2 = req.body.option2.option;
  const option2ID = req.body.option2.id;

  const option3 = req.body.option3.option;
  const option3ID = req.body.option3.id;

  const option4 = req.body.option4.option;
  const option4ID = req.body.option4.id;

  const updateQnQuery = 'UPDATE QUIZ SET QUIZ_QUESTION = ? WHERE QUIZ_ID = ?'

  let count = 0;
  let anyErr = false;

  conn.query(updateQnQuery, [question,quizID], (err,result) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
      anyErr = true;
    } else {
      const updateOptionQuery = 'UPDATE QUIZ_OPTION SET QUIZ_OPTION = ? WHERE QUIZ_OPTION_ID = ? AND QUIZ_ID = ?'
            
      conn.query(updateOptionQuery, [option1,option1ID,quizID], (err, data) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
          anyErr = true;
          count += 1;
        } else {
          count += 1;
          if (!anyErr && count === 4) {
            res.send(JSON.stringify({ success: 'true' }));
          }
        }
      });

      conn.query(updateOptionQuery, [option2,option2ID,quizID], (err, data) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
          anyErr = true;
          count += 1;
        } else {
          count += 1;
          if (!anyErr && count == 4) {
            res.send(JSON.stringify({ success: 'true' }));
          }
        }
      });

      conn.query(updateOptionQuery, [option3,option3ID,quizID], (err, data) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
          anyErr = true;
          count += 1;
        } else {
          count += 1;
          if (!anyErr && count == 4) {
            res.send(JSON.stringify({ success: 'true' }));
          }
        }
      });

      conn.query(updateOptionQuery, [option4,option4ID,quizID], (err, data) => {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({ success: 'false' }));
          anyErr = true;
          count += 1;
        } else {
          count += 1;
          if (!anyErr && count == 4) {
            res.send(JSON.stringify({ success: 'true' }));
          }
        }
      });
    }
  });
});
module.exports = router;
