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
        quiz_id = data[0].count + 1;
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
    console.log(req.body)
    var hotspot = req.body.hotspot;
    var quiz = req.body.quiz;
    var ms_query = 'INSERT INTO MISSION VALUES (?,?)';

    conn.query(ms_query, [mission_id,hotspot], function(err, data){
        if (err){
            res.send(JSON.stringify({success: "false"}));
            console.log(err);
        } else{
            var qz_query = 'INSERT INTO QUIZ VALUES (?,?,?,?)';
            var qz_opt_query = 'INSERT INTO QUIZ_OPTION VALUES (?,?,?)';

            for (var index in quiz){
                console.log(index);
                var question = index.question;
                var option1 = index.option1;
                var option2 = index.option2;
                var option3 = index.option3;
                var option4 = index.option4;
                var answer = index.answer;
                conn.query(qz_query, [quiz_id, question, answer, mission_id], function(err, response){
                    if (err){
                        res.send(JSON.stringify({success: "false"}));
                        console.log(err);
                    } else{
                        var counter = 0;
                        conn.query(qz_opt_query, [quiz_id, quiz_option_id, option1], function(err, reply){
                            if (err){
                                res.send(JSON.stringify({success: "false"}));
                                console.log(err);
                            } else{
                                counter += 1;
                            }
                        });

                        quiz_option_id += 1;
                        conn.query(qz_opt_query, [quiz_id, quiz_option_id, option2], function(err, reply){
                            if (err){
                                res.send(JSON.stringify({success: "false"}));
                                console.log(err);
                            }else{
                                counter += 1;
                            }
                        });

                        quiz_option_id += 1;
                        conn.query(qz_opt_query, [quiz_id, quiz_option_id, option3], function(err, reply){
                            if (err){
                                res.send(JSON.stringify({success: "false"}));
                                console.log(err);
                            }else{
                                counter += 1;
                            }
                        });

                        quiz_option_id += 1;
                        conn.query(qz_opt_query, [quiz_id, quiz_option_id, option4], function(err, reply){
                            if (err){
                                res.send(JSON.stringify({success: "false"}));
                                console.log(err);
                            }else{
                                counter += 1;
                            }
                        });

                        if (counter == 4){
                            res.send(JSON.stringify({success: "true"}));
                        }
                        quiz_option_id += 1;
                    }
                });
                quiz_id += 1;
            }
            mission_id += 1;
        }
    });
});
module.exports=router;


