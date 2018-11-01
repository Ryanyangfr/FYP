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
                mission_query = 'SELECT QUIZ_ID, QUIZ_QUESTION, QUIZ_ANSWER, QUIZ_OPTION FROM QUIZ,QUIZ_OPTION WHERE MISSION_ID = ? AND QUIZ.QUIZ_ID = QUIZ_OPTION.QUIZ_ID';

                conn.query(mission_query, mission, function(err, quiz_details){
                    console.log(mission);
                    console.log(hotspot_name);
                    if (err){
                        console.log(err);
                        // number = number + 1;
                    } else{
                        if (quiz_details.length != 0){
                            var currentQuiz_ID = quiz_details[0].QUIZ_ID;
                            var answer_index = 0;
                            var quiz_question = [];
                            // use to keep track of answer index
                            var count = 1;
                            quiz_details.forEach(function(detail, i){
                                var quiz_option = [];
                                if(detail.QUIZ_OPTION == detail.QUIZ_ANSWER){
                                    answer_index = count;;
                                    count = 1;
                                }
                                count = count + 1;
                                quiz_option.push(detail.QUIZ_OPTION);
                                if (currentQuiz_ID != detail.QUIZ_ID){
                                    currentQuiz_ID = detail.QUIZ_ID
                                    quiz_question.push({quiz_question:quiz_details[i-1].QUIZ_QUESTION,  quiz_answer: answer_index, quiz_options: quiz_option})
                                }
                            })
                            
                            response.push({hotspot: hotspot_name, quiz: quiz_question});
                            console.log('mission: ' + mission);
                            console.log('mission length: ' + missions.length);
                        }
                        if (mission == missions.length){
                            res.end(JSON.stringify(response, null, 3));
                        }
                        // number = number + 1;
                    }
                })

            })
            // console.log(response);
            // res.send(JSON.stringify(response));
        }
    })
})

module.exports = router;