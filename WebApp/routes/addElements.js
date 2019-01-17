var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var quiz_id = 0;
var quiz_option_id = 0
var quiz_query = 'SELECT COUNT(*) as count FROM QUIZ';
var quiz_option_query = 'SELECT COUNT(*) as count FROM QUIZ_OPTION';

conn.query(quiz_query, function(err, data){
    if (err){
        console.log(err);
    }else{
        quiz_id = data[0].count;
    }
});

conn.query(quiz_option_query, function(err, data){
    if (err){
        console.log(err);
    }else{
        quiz_option_id = data[0].count + 1;
    }
});

var mission_id = 0;
var mission_query = 'SELECT COUNT(*) as count from MISSION';

conn.query(mission_query, function(err, data){
    if (err){
        console.log(err);
    }else{
        mission_id = data[0].count + 1;
    }
});

router.post('/addHotspot', function(req,res){
    console.log(req.body)
    var hotspotName = req.body.hotspot_name;
    var latitude = req.body.latitude;
    var longtitude = req.body.longtitude;
    var narrative_id = req.body.narrative_id;

    var query = 'INSERT INTO HOTSPOT VALUES (?,?,?,?)';

    conn.query(query,[hotspotName,latitude,longtitude,narrative_id], function(err, query){
        if(err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}))
        }else{
            res.send(JSON.stringify({success: "true"}));
        }
    })
})

router.post('/addNarrative', function(req,res){
    console.log(req.body);
    var narrative = req.body.narrative;
    var title = req.body.title;

    var getNumNarrative = 'SELECT COUNT(*) as count from NARRATIVE';

    conn.query(getNumNarrative, function(err, data){
        console.log('error: ' + err);
        console.log('data: ' + data[0]);
        var count = parseInt(data[0].count);
        var id = count + 1;

        var query = 'INSERT INTO NARRATIVE VALUES (?,?,?)';

        conn.query(query, [id, title, narrative], function(err, reply){
            if(err){
                console.log(err);
                res.send(JSON.stringify({success: "false"}))
            }else{
                res.send(JSON.stringify({success: "true"}));
            }
        })
    })
})

router.post('/addQuiz', function(req,res){
    // console.log(req.body)
    var hotspot = req.body.hotspot;
    var title = req.body.title;
    var quiz = req.body.quiz;
    var ms_query = 'INSERT INTO MISSION VALUES (?,?,?)';
    var quiz_to_add = [];
    var quiz_option_to_add = [];

    conn.query(ms_query, [mission_id,title,hotspot], function(err, data){
        if (err){
            res.send(JSON.stringify({success: "false"}));
            console.log(err);
        } else{
            count = 0;
            for (var index in quiz){
                count += 1;
                row = quiz[index]
                console.log(row);
                var question = row.question;
                var option1 = row.option1;
                var option2 = row.option2;
                var option3 = row.option3;
                var option4 = row.option4;
                var answer = row.answer;
                // console.log("quiz: " + quiz_id);
                               
                var noErrors = update_quiz(count, quiz.length, quiz_id, question, answer, mission_id, quiz_option_id, option1, option2, option3, option4, res);
                 
                console.log(noErrors);
                if(!noErrors){
                    return;
                }
                console.log("quiz_id_again: " + quiz_id);
                quiz_id = quiz_id + 1
                quiz_option_id = quiz_option_id + 4;
                    
            }
        }
    });
});

function update_quiz(count, final_count, quiz_id, question, answer, mission_id, quiz_option_id, option1, option2, option3, option4, res){
    var qz_query = 'INSERT INTO QUIZ VALUES (?,?,?,?)';
    var qz_opt_query = 'INSERT INTO QUIZ_OPTION VALUES (?,?,?)';
    var counter = 0;
    conn.query(qz_query, [quiz_id, question, answer, mission_id], function(err, response){
        if (err){
            res.send(JSON.stringify({success: "false"}));
            console.log(err);
            return false;
        } else{
            counter = 0;
            conn.query(qz_opt_query, [quiz_id, quiz_option_id, option1], function(err, reply){
                if (err){
                    res.send(JSON.stringify({success: "false"}));
                    console.log(err);
                    return false;
                } else{
                    console.log('1:')
                    counter += 1;
                }
            });

            quiz_option_id += 1;
            conn.query(qz_opt_query, [quiz_id, quiz_option_id, option2], function(err, reply){
                if (err){
                    res.send(JSON.stringify({success: "false"}));
                    console.log(err);
                    return false;
                }else{
                    console.log('2:')   
                    counter += 1;
                }
            });

            quiz_option_id += 1;
            conn.query(qz_opt_query, [quiz_id, quiz_option_id, option3], function(err, reply){
                if (err){
                    res.send(JSON.stringify({success: "false"}));
                    console.log(err);
                    return false;
                }else{
                    console.log('3:') 
                    counter += 1;
                }
            });

            quiz_option_id += 1;
            conn.query(qz_opt_query, [quiz_id, quiz_option_id, option4], function(err, reply){
                if (err){
                    res.send(JSON.stringify({success: "false"}));
                    console.log(err);
                    return false;
                }else{
                    console.log('4:')    
                    counter += 1;
                }
            });

            while(counter <= 4){}
            if(count == final_count){
                res.send(JSON.stringify({success: "true"}))
            }
        }
    });
};
module.exports=router;


