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
                mission_query = 'SELECT QUIZ.QUIZ_ID, QUIZ_QUESTION, QUIZ_ANSWER, QUIZ_OPTION FROM QUIZ,QUIZ_OPTION WHERE MISSION_ID = ? AND QUIZ.QUIZ_ID = QUIZ_OPTION.QUIZ_ID';

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
                            //start with empty quiz option array
                            var quiz_option = [];
                            quiz_details.forEach(function(detail, i){
                                console.log(detail.QUIZ_OPTION == detail.QUIZ_ANSWER);
                                //add one segment to the json when the row hops to a new question
                                if (currentQuiz_ID != detail.QUIZ_ID){
                                    currentQuiz_ID = detail.QUIZ_ID
                                    quiz_question.push({quiz_question:quiz_details[i-1].QUIZ_QUESTION,  quiz_answer: answer_index, quiz_options: quiz_option})
                                    quiz_option = [];
                                    count = 1;
                                }

                                if(detail.QUIZ_OPTION == detail.QUIZ_ANSWER){
                                    answer_index = count;
                                }

                                // console.log('option: ' + detail.QUIZ_OPTION);
                                // console.log('count: ' + count);
                                // console.log('answer_index: ' + answer_index);
                                // console.log('currentQuiz_ID: ' + currentQuiz_ID);
                                // console.log('quiz id: ' + detail.QUIZ_ID);

                                count = count + 1;
                                quiz_option.push(detail.QUIZ_OPTION);
                            })
                            quiz_question.push({quiz_question:quiz_details[quiz_details.length-1].QUIZ_QUESTION,  quiz_answer: answer_index, quiz_options: quiz_option})
                            
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
});

router.get('/getQuizQuestion', function(req,res){
    var response = [];
    var missionID = req.query.mission;
    console.log('missionID: ' + missionID);
    var query = 'SELECT QUIZ_ID, QUIZ_QUESTION FROM QUIZ WHERE MISSION_ID = ?';

    conn.query(query, missionID, function(err, questions){
        if (err){
            console.log(err);
        } else{
            for(var index in questions){
                response.push({question: questions[index].QUIZ_QUESTION, quiz_id: questions[index].QUIZ_ID});
            }
            res.send(response);
        }
    })
});

router.get('/getQuizOptions', function(req,res){
    var response = [];
    var quizID = req.query.quizID;
    // console.log('missionID: ' + missionID);
    var query = 'SELECT QUIZ_OPTION, QUIZ_OPTION_ID FROM QUIZ_OPTION WHERE QUIZ_ID = ?';

    conn.query(query, quizID, function(err, options){
        if (err){
            console.log(err);
        } else{
            for(var index in options){
                response.push({option: options[index].QUIZ_OPTION, option_id: options[index].QUIZ_OPTION_ID});
            }
            res.send(response);
        }
    })
});

module.exports = router;