const express = require('express');

const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

// get all dragAndDrop question for a specified trail instance
// input: /api?trail_instance_id=123456
// response: [{hotspot: hotspotName, question, question, drag_and_drop: {drag_and_drop_question: option, drag_and_drop_answer: answer}}] 
router.get('/getDragAndDrop',(req,res) => {
  const trail_instance_id = req.query.trail_instance_id;
  const query = 'SELECT MISSION_ID, HOTSPOT_NAME FROM TRAIL_HOTSPOT WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) ORDER BY MISSION_ID';
  const response = [];
  let count = 0;

  conn.query(query, trail_instance_id, (err, missions) => {
    if (err) {
      console.log(err);
    } else {
      missions.forEach((missionRow) => {
        const mission = missionRow.MISSION_ID;
        const hotspot_name = missionRow.HOTSPOT_NAME;

        mission_query = 'SELECT DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION WHERE DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID AND MISSION_ID = ?';

        conn.query(mission_query, mission, (err, drag_and_drop_details) => {
          if (err) {
            console.log(err);
          } else {
            count += 1;
            const drag_and_drop_ = [];
            if (drag_and_drop_details.length !== 0) {
              drag_and_drop_details.forEach((detail, i) => {
                drag_and_drop_.push({ drag_and_drop_question: detail.DRAGANDDROP_QUESTION_OPTION,  drag_and_drop_answer: detail.DRAGANDDROP_QUESTION_ANSWER });
              });
              response.push({ hotspot: hotspot_name, question: drag_and_drop_details[0].DRAGANDDROP_QUESTION, drag_and_drop: drag_and_drop_ });
            }
            if (count == missions.length) {
              res.end(JSON.stringify(response, null, 3));
            }
          }
        });
      });
    }
  });
});

// get all drag and drop question in the database
// output: [{id: draganddropID, question: question, title: title, options: [{option: option, answer: answer}], missionID: missionID}]
router.get('/getAllDragAndDrop', (req,res) => {
  const dragNDropQuery = 'SELECT MISSION.MISSION_ID, MISSION_TITLE, DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER, DRAG_AND_DROP.DRAGANDDROP_ID FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION, MISSION WHERE DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID AND DRAG_AND_DROP.MISSION_ID = MISSION.MISSION_ID';
  const response = [];

  conn.query(dragNDropQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let options = [];
    let currentQuestion = data[0].DRAGANDDROP_QUESTION;
    let currentTitle = data[0].MISSION_TITLE;
    let currentID = data[0].DRAGANDDROP_ID;
    let currentMissionID = data[0].MISSION_ID;
    if (data.length != 0) {
      data.forEach((row) => {
        if (row.DRAGANDDROP_QUESTION !== currentQuestion) {
          response.push({
            id: currentID, question: currentQuestion, title: currentTitle, options, missionID: currentMissionID
          });
          options = [];
          currentQuestion = row.DRAGANDDROP_QUESTION;
          currentTitle = row.MISSION_TITLE;
          currentID = row.DRAGANDDROP_ID;
          currentMissionID = row.MISSION_ID;
          // currentAnswer = row.DRAGANDDROP_QUESTION_ANSWER;
        }
        options.push({ option: row.DRAGANDDROP_QUESTION_OPTION, answer: row.DRAGANDDROP_QUESTION_ANSWER });
      });
      response.push({
        id: currentID, question: currentQuestion, title: currentTitle, options, missionID: currentMissionID,
      });
    }
    res.send(response);
  });
});

// gets all drag and drop from a previously used trail instance ID
// input: api?trailInstanceID=123456
// output: [{id: draganddropID, question: question, title: title, options: [{option: option, answer: answer}], missionID: missionID}]
router.get('/getDragAndDropHistory', (req,res) => {
  const trailInstanceID = req.query.trailInstanceID;
  const dragNDropQuery = 'SELECT MISSION_HISTORY.MISSION_ID, MISSION_TITLE, DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER, DRAG_AND_DROP_HISTORY.DRAGANDDROP_ID FROM DRAG_AND_DROP_HISTORY, DRAG_AND_DROP_OPTION_HISTORY, MISSION_HISTORY, SUMMARY_TABLE WHERE DRAG_AND_DROP_HISTORY.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION_HISTORY.DRAGANDDROP_ID AND DRAG_AND_DROP_HISTORY.MISSION_ID = MISSION_HISTORY.MISSION_ID AND DRAG_AND_DROP_HISTORY.MISSION_ID = SUMMARY_TABLE.MISSION_ID AND TRAIL_INSTANCE_ID = ?';
  const response = [];

  conn.query(dragNDropQuery, trailInstanceID, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (data.length === 0) {
      res.send(response);
      return;
    }
    let options = [];
    let currentQuestion = data[0].DRAGANDDROP_QUESTION;
    let currentTitle = data[0].MISSION_TITLE;
    let currentID = data[0].DRAGANDDROP_ID;
    let currentMissionID = data[0].MISSION_ID;
    // currentAnswer = data[0].DRAGANDDROP_QUESTION_ANSWER;
    if (data.length != 0) {
      data.forEach((row) => {
        if (row.DRAGANDDROP_QUESTION !== currentQuestion) {
          response.push({
            id: currentID, question: currentQuestion, title: currentTitle, options, missionID: currentMissionID
          });
          options = [];
          currentQuestion = row.DRAGANDDROP_QUESTION;
          currentTitle = row.MISSION_TITLE;
          currentID = row.DRAGANDDROP_ID;
          currentMissionID = row.MISSION_ID;
          // currentAnswer = row.DRAGANDDROP_QUESTION_ANSWER;
        }
        options.push({ option: row.DRAGANDDROP_QUESTION_OPTION, answer: row.DRAGANDDROP_QUESTION_ANSWER });
      });
      response.push({
        id: currentID, question: currentQuestion, title: currentTitle, options, missionID: currentMissionID
      });
    }
    res.send(response);
  });
});

// gets all drag and drop from a previously used trail instance ID
// input: api?missionID=1
// output: [{id: draganddropID, question: question, title: title, options: [{option: option, answer: answer}], missionID: missionID}]
router.get('/getDragAndDropByMission', (req,res) => {
  const missionID = req.query.missionID;
  const dragNDropQuery = 'SELECT MISSION_TITLE, DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER, DRAG_AND_DROP.DRAGANDDROP_ID FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION, MISSION WHERE DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID AND DRAG_AND_DROP.MISSION_ID = MISSION.MISSION_ID AND MISSION.MISSION_ID = ?';
  const response = [];

  conn.query(dragNDropQuery, missionID, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (data.length === 0) {
      res.send(response);
      return;
    }
    const options = [];
    const currentQuestion = data[0].DRAGANDDROP_QUESTION;
    const currentTitle = data[0].MISSION_TITLE;
    const currentID = data[0].DRAGANDDROP_ID;

    data.forEach((row) => {
      options.push({ option: row.DRAGANDDROP_QUESTION_OPTION, answer: row.DRAGANDDROP_QUESTION_ANSWER });
    });
    response.push({
      id: currentID, question: currentQuestion, title: currentTitle, options,
    });
    res.send(response);
  });
});

module.exports = router;
