const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const router = express.Router();

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// getting the current quiz ids and quiz option ids
let quiz_id = 0;
let quiz_option_id = 0;
const quiz_query = 'SELECT COUNT(*) as count FROM QUIZ';
const quiz_option_query = 'SELECT COUNT(*) as count FROM QUIZ_OPTION';

conn.query(quiz_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    quiz_id = data[0].count + 1;
  }
});

conn.query(quiz_option_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    quiz_option_id = data[0].count + 1;
  }
});

// getting the current wefie question id
let wefie_id = 0;
const wefie_query = 'SELECT COUNT(*) as count from SUBMISSION_QUESTION';

conn.query(wefie_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    wefie_id = data[0].count + 1;
  }
});

// getting the current mission id
let mission_id = 0;
const mission_query = 'SELECT COUNT(*) as count from MISSION';

conn.query(mission_query, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    mission_id = data[0].count + 1;
    console.log(mission_id);
  }
});

router.post('/addHotspot', (req,res) => {
  console.log(req.body);
  const hotspotName = req.body.hotspot_name;
  const latitude = req.body.latitude;
  const longtitude = req.body.longtitude;
  // const narrative_id = req.body.narrative_id;

  const query = 'INSERT INTO HOTSPOT VALUES (?,?,?)';

  conn.query(query,[hotspotName,latitude,longtitude], (err, query) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.post('/addNarrative', (req,res) => {
  console.log(req.body);
  const narrative = req.body.narrative;
  const title = req.body.title;

  const getNumNarrative = 'SELECT COUNT(*) as count from NARRATIVE';

  conn.query(getNumNarrative, (err, data) => {
    console.log(`error: ${err}`);
    console.log(`data: ${data[0]}`);
    const count = parseInt(data[0].count);
    const id = count + 1;

    const query = 'INSERT INTO NARRATIVE VALUES (?,?,?)';

    conn.query(query, [id, title, narrative], (err, reply) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify({ success: 'false' }));
      } else {
        res.send(JSON.stringify({ success: 'true' }));
      }
    });
  });
});

router.post('/addQuiz', (req,res) => {
  console.log('quiz: ');
  console.log(req.body);
  // const hotspot = req.body.hotspot;
  const title = req.body.title;
  const quiz = req.body.quiz;
  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';

  conn.query(ms_query, [mission_id,title], (err, data) => {
    if (err) {
      res.send(JSON.stringify({ success: 'false' }));
      console.log(err);
    } else {
      let count = 0;
      for (const index in quiz) {
        console.log(`quiz_id_again: ${quiz_id}`);
        count += 1;
        row = quiz[index];
        console.log(row);
        const question = row.question;
        const option1 = row.option1;  
        const option2 = row.option2;
        const option3 = row.option3;
        const option4 = row.option4;
        const answer = row.answer;
        // console.log("quiz: " + quiz_id);
        // console.log(count);
        // console.log(quiz.length)
        update_quiz(count, quiz.length, quiz_id, question, answer, mission_id, quiz_option_id, option1, option2, option3, option4, res);

        // console.log(noErrors);
        // if(!noErrors){
        //     return;
        // }
        quiz_id = quiz_id + 1;
        quiz_option_id = quiz_option_id + 4;
      }
      mission_id += 1;
    }
  });
});

function update_quiz(count, final_count, quiz_id, question, answer, mission_id, quiz_option_id, option1, option2, option3, option4, res) {
  const qz_query = 'INSERT INTO QUIZ VALUES (?,?,?,?)';
  const qz_opt_query = 'INSERT INTO QUIZ_OPTION VALUES (?,?,?)';
  let counter = 0;
  conn.query(qz_query, [quiz_id, question, answer, mission_id], (err, response) => {
    if (err) {
      res.send(JSON.stringify({ success: 'false' }));
      console.log(err);
      return false;
    }
    counter = 0;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option1], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      counter += 1;
      console.log(`counter: ${counter}`);
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });

    quiz_option_id += 1;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option2], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      console.log('2:');
      counter += 1;
      console.log(`counter: ${counter}`);
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });

    quiz_option_id += 1;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option3], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      console.log('3:');
      counter += 1;
      console.log(`counter: ${counter}`);
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });

    quiz_option_id += 1;
    conn.query(qz_opt_query, [quiz_id, quiz_option_id, option4], (err, reply) => {
      if (err) {
        res.send(JSON.stringify({ success: 'false' }));
        console.log(err);
        return false;
      }
      console.log('4:');
      counter += 1;
      console.log(`counter: ${counter}`);
      if (counter === 4 && count === final_count) {
        res.send(JSON.stringify({ success: 'true' }));
        mission_id += 1;
        return true;
      }
    });
  });
};

router.post('/addWefieQuestion', (req,res) => {
  const question = req.body.question;
  const title = req.body.title;
  const hotspot = req.body.hotspot;

  const ms_query = 'INSERT INTO MISSION VALUES (?,?)';
  console.log('add wefie question called');
  console.log(req.body);
  conn.query(ms_query, [mission_id,title], (err, data) => {
    if (err) {
      res.send(JSON.stringify({ success: 'false' }));
      console.log(err);
    } else {
      const add_query = 'INSERT INTO SUBMISSION_QUESTION VALUES (?,?)';
      conn.query(add_query, [wefie_id, question, mission_id], (err, data) => {
        if (err) {
          res.send(JSON.stringify({ success: 'false' }));
          console.log(err);
        } else {
          res.send(JSON.stringify({ success: 'true' }));
          mission_id += 1;
          wefie_id += 1;
        }
      });
    }
  });
});
module.exports = router;
