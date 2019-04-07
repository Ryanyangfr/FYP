const express = require('express');

const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.get('/getQuizzes', (req, res) => {
  const trail_instance_id = req.query.trail_instance_id;
  const query = 'SELECT MISSION_ID, HOTSPOT_NAME FROM TRAIL_HOTSPOT WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ? ORDER BY MISSION_ID)';
  const response = [];
  let number = 0;
  conn.query(query, trail_instance_id, (err, missions) => {
    if (err) {
      console.log(err);
    } else{
      missions.forEach((missionRow) => {
        const mission = missionRow.MISSION_ID;
        const hotspot_name = missionRow.HOTSPOT_NAME;
        const mission_query = 'SELECT QUIZ.QUIZ_ID, QUIZ_QUESTION, QUIZ_ANSWER, QUIZ_OPTION FROM QUIZ,QUIZ_OPTION WHERE MISSION_ID = ? AND QUIZ.QUIZ_ID = QUIZ_OPTION.QUIZ_ID';

        conn.query(mission_query, mission, (err, quiz_details) => {
          number = number + 1;
          if (err) {
            console.log(err);
            // number = number + 1;
          } else {
            if (quiz_details.length !== 0) {
              let currentQuiz_ID = quiz_details[0].QUIZ_ID;
              let answer_index = 0;
              const quiz_question = [];
              // use to keep track of answer index
              let count = 1;
              //start with empty quiz option array
              let quiz_option = [];
              quiz_details.forEach((detail, i) => {
                //add one segment to the json when the row hops to a new question
                if (currentQuiz_ID !== detail.QUIZ_ID) {
                  currentQuiz_ID = detail.QUIZ_ID;
                  quiz_question.push({ quiz_question:quiz_details[i-1].QUIZ_QUESTION,  quiz_answer: answer_index, quiz_options: quiz_option });
                  quiz_option = [];
                  count = 1;
                }

                if (detail.QUIZ_OPTION == detail.QUIZ_ANSWER) {
                  answer_index = count;
                }

                count = count + 1;
                quiz_option.push(detail.QUIZ_OPTION);
              });
              quiz_question.push({ quiz_question:quiz_details[quiz_details.length-1].QUIZ_QUESTION,  quiz_answer: answer_index, quiz_options: quiz_option });
                            
              response.push({ hotspot: hotspot_name, quiz: quiz_question });
            }
            if (number === missions.length) {
              res.send(JSON.stringify(response, null, 3));
            }
          }
        });
      });
    }
  });
});

router.get('/getQuizQuestion', (req,res) => {
  const response = [];
  const missionID = req.query.mission;
  const query = 'SELECT QUIZ_ID, QUIZ_QUESTION, QUIZ_ANSWER FROM QUIZ WHERE MISSION_ID = ?';

  conn.query(query, missionID, (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in questions) {
        response.push({ question: questions[index].QUIZ_QUESTION, quiz_id: questions[index].QUIZ_ID, quiz_answer: questions[index].QUIZ_ANSWER });
      }
      res.send(response);
    }
  });
});

router.get('/getQuizQuestionHistory', (req,res) => {
  const response = [];
  const missionID = req.query.mission;
  const query = 'SELECT QUIZ_ID, QUIZ_QUESTION, QUIZ_ANSWER FROM QUIZ_HISTORY WHERE MISSION_ID = ?';

  conn.query(query, missionID, (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in questions) {
        response.push({ question: questions[index].QUIZ_QUESTION, quiz_id: questions[index].QUIZ_ID, quiz_answer: questions[index].QUIZ_ANSWER });
      }
      res.send(response);
    }
  });
});

router.get('/getQuizOptions', (req,res) => {
  const response = [];
  const quizID = req.query.quizID;

  const query = 'SELECT QUIZ_OPTION, QUIZ_OPTION_ID FROM QUIZ_OPTION WHERE QUIZ_ID = ?';

  conn.query(query, quizID, (err, options) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in options) {
        response.push({ option: options[index].QUIZ_OPTION, option_id: options[index].QUIZ_OPTION_ID });
      }
      res.send(response);
    }
  });
});

router.get('/getQuizOptionsHistory', (req,res) => {
  const response = [];
  const quizID = req.query.quizID;
  const query = 'SELECT QUIZ_OPTION, QUIZ_OPTION_ID FROM QUIZ_OPTION_HISTORY WHERE QUIZ_ID = ?';

  conn.query(query, quizID, (err, options) => {
    if (err) {
      console.log(err);
    } else {
      for (const index in options) {
        response.push({ option: options[index].QUIZ_OPTION, option_id: options[index].QUIZ_OPTION_ID });
      }
      res.send(response);
    }
  });
});

module.exports = router;
