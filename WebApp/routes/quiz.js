var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getQuizzes', function(req, res){
    var trail_instance_id = req.query.trail_instance_id;
    query = 'SELECT M.MISSION_ID, HOTSPOT_NAME FROM TRAIL_MISSION AS TM, MISSION AS M WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TM.MISSION_ID = M.MISSION_ID';
    var response = [];
    var number = 1;
    conn.query(query, trail_instance_id, function(err, missions){
        if (err){
            console.log(err);
        }else{
            console.log(missions);
            missions.forEach(function(missionRow){
                var mission = missionRow.MISSION_ID;
                var hotspot_name = missionRow.HOTSPOT_NAME;
                console.log(mission);
                console.log(hotspot_name);
                mission_query = 'SELECT QUIZ_QUESTION, QUIZ_ANSWER, QUIZ_OPTION FROM QUIZ,QUIZ_OPTION WHERE MISSION_ID = ? AND QUIZ.QUIZ_ID = QUIZ_OPTION.QUIZ_ID';

                conn.query(mission_query, mission, function(err, quiz_details){
                    if (err){
                        console.log(err);
                    } else{
                        if (quiz_details.length != 0){
                            var answer_index = 0;
                            quiz_option = [];
                            quiz_details.forEach(function(detail, i){
                                if(detail.QUIZ_OPTION == detail.QUIZ_ANSWER){
                                    answer_index = i+1;
                                }
                                quiz_option.push(detail.QUIZ_OPTION);
                            })
                            
                            response.push({hotspot: hotspot_name, quiz_question:quiz_details[0].QUIZ_QUESTION,  quiz_answer: answer_index, quiz_options: quiz_option});
                            if (number == missions.length){
                                res.end(JSON.stringify(response, null, 3));
                            }
                            console.log('number: ' + number);
                            console.log('mission length: ' + missions.length);
                        }
                        number = number + 1;
                    }
                })

            })
            // console.log(response);
            // res.send(JSON.stringify(response));
        }
    })
})

module.exports = router;