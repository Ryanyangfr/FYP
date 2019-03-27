var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getDragAndDrop',function(req,res){
  var trail_instance_id = req.query.trail_instance_id;
  query = 'SELECT MISSION_ID, HOTSPOT_NAME FROM TRAIL_HOTSPOT WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) ORDER BY MISSION_ID';
  var response = []
  var count = 0;

  conn.query(query, trail_instance_id, function(err, missions){
    if (err){
      console.log(err);
    }else{
      // console.log(missions);
      missions.forEach(function(missionRow){
        var mission = missionRow.MISSION_ID;
        var hotspot_name = missionRow.HOTSPOT_NAME;
        console.log(mission)
        mission_query = 'SELECT DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION WHERE DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID AND MISSION_ID = ?';

        conn.query(mission_query, mission, function(err, drag_and_drop_details){
          console.log(mission);
          console.log(hotspot_name);
          if (err){
            console.log(err);
            // number = number + 1;
          } else{
            count += 1;
            // console.log(drag_and_drop_details);
            drag_and_drop_ = []
            if (drag_and_drop_details.length != 0){
              drag_and_drop_details.forEach(function(detail, i){
                drag_and_drop_.push({drag_and_drop_question:detail.DRAGANDDROP_QUESTION_OPTION,  drag_and_drop_answer: detail.DRAGANDDROP_QUESTION_ANSWER})
              })
              // console.log(drag_and_drop_)
              response.push({hotspot: hotspot_name, question: drag_and_drop_details[0].DRAGANDDROP_QUESTION, drag_and_drop: drag_and_drop_});
              console.log(`response: ${response}`);
              console.log(response);
              // console.log('count: ' + typeof count);
              // console.log('mission length: ' + typeof missions.length);                            
            }
            console.log(`count: ${count}`);
            console.log(`missions: ${missions.length}`);
            if(count == missions.length){
              res.end(JSON.stringify(response, null, 3));
              console.log('count: ' + count);
              console.log('mission length: ' + missions.length);
            }                        // number = number + 1;
          }
        })
      })
    }
    console.log(response)
        
  })
});

router.get('/getAllDragAndDrop', (req,res) => {
  const dragNDropQuery = 'SELECT MISSION.MISSION_ID, MISSION_TITLE, DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER, DRAG_AND_DROP.DRAGANDDROP_ID FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION, MISSION WHERE DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID AND DRAG_AND_DROP.MISSION_ID = MISSION.MISSION_ID';
  const response = [];

  conn.query(dragNDropQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    options = [];
    currentQuestion = data[0].DRAGANDDROP_QUESTION;
    currentTitle = data[0].MISSION_TITLE;
    currentID = data[0].DRAGANDDROP_ID;
    currentMissionID = data[0].MISSION_ID
    // currentAnswer = data[0].DRAGANDDROP_QUESTION_ANSWER;
    if (data.length != 0) {
      data.forEach((row) => {
        if (row.DRAGANDDROP_QUESTION !== currentQuestion) {
          response.push({id: currentID, question: currentQuestion, title: currentTitle, options: options, missionID: currentMissionID});
          options = [];
          currentQuestion = row.DRAGANDDROP_QUESTION;
          currentTitle = row.MISSION_TITLE;
          currentID = row.DRAGANDDROP_ID;
          currentMissionID = row.MISSION_ID
          // currentAnswer = row.DRAGANDDROP_QUESTION_ANSWER;
        }
        options.push({option: row.DRAGANDDROP_QUESTION_OPTION, answer: row.DRAGANDDROP_QUESTION_ANSWER});
      });
      response.push({id: currentID, question: currentQuestion, title:currentTitle, options: options, missionID: currentMissionID});
    }
    res.send(response);
  });
});

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
    options = [];
    currentQuestion = data[0].DRAGANDDROP_QUESTION;
    currentTitle = data[0].MISSION_TITLE;
    currentID = data[0].DRAGANDDROP_ID;
    currentMissionID = data[0].MISSION_ID
    // currentAnswer = data[0].DRAGANDDROP_QUESTION_ANSWER;
    if (data.length != 0) {
      data.forEach((row) => {
        if (row.DRAGANDDROP_QUESTION !== currentQuestion) {
          response.push({id: currentID, question: currentQuestion, title: currentTitle, options: options, missionID: currentMissionID});
          options = [];
          currentQuestion = row.DRAGANDDROP_QUESTION;
          currentTitle = row.MISSION_TITLE;
          currentID = row.DRAGANDDROP_ID;
          currentMissionID = row.MISSION_ID
          // currentAnswer = row.DRAGANDDROP_QUESTION_ANSWER;
        }
        options.push({option: row.DRAGANDDROP_QUESTION_OPTION, answer: row.DRAGANDDROP_QUESTION_ANSWER});
      });
      response.push({id: currentID, question: currentQuestion, title:currentTitle, options: options, missionID: currentMissionID});
    }
    res.send(response);
  });
});

router.get('/getDragAndDropByMission', (req,res) => {
  const missionID = req.query.missionID
  const dragNDropQuery = 'SELECT MISSION_TITLE, DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER, DRAG_AND_DROP.DRAGANDDROP_ID FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION, MISSION WHERE DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID AND DRAG_AND_DROP.MISSION_ID = MISSION.MISSION_ID AND MISSION.MISSION_ID = ?';
  const response = [];

  conn.query(dragNDropQuery, missionID, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (data.length === 0) {
        console.log('no drag and drop mission');
        res.send(response);
        return;
    }
    options = []
    currentQuestion = data[0].DRAGANDDROP_QUESTION;
    currentTitle = data[0].MISSION_TITLE;
    currentID = data[0].DRAGANDDROP_ID;
    // currentAnswer = data[0].DRAGANDDROP_QUESTION_ANSWER;
    data.forEach((row) => {
        options.push({option: row.DRAGANDDROP_QUESTION_OPTION, answer: row.DRAGANDDROP_QUESTION_ANSWER})
    })
    response.push({id: currentID, question: currentQuestion, title:currentTitle, options: options});
    res.send(response);
  });
});

module.exports = router;








