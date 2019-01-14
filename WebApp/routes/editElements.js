var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/editHotspot', function(req,res){
    var hotspotName = req.body.hotspot_name.value;
    var latitude = req.body.latitude;
    var longtitude = req.body.longtitude;
    var narrative_id = req.body.narrative_id;

    console.log(req.body);
    var query = 'UPDATE HOTSPOT SET LATITUDE = ?, LONGTITUDE = ?, NARRATIVE_ID = ? WHERE HOTSPOT_NAME = ?';

    conn.query(query,[latitude,longtitude,narrative_id,hotspotName], function(err, data){
        if(err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}));
        }else{
            res.send(JSON.stringify({success: "true"}));
        }
    });
});

router.post('/editNarrative', function(req,res){
    var narrative_id = req.body.narrative_id;
    var narrative = req.body.narrative;

    console.log(req.body);
    var query = 'UPDATE NARRATIVE SET NARRATIVE = ? WHERE NARRATIVE_ID = ?';

    conn.query(query,[narrative, narrative_id], function(err, data){
        if(err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}));
        }else{
            res.send(JSON.stringify({success: "true"}));
        }
    });
});

router.post('/editQuiz', function(req,res){
    var quizID = req.body.question.value;
    var question = req.body.question.label;

    var option1 = req.body.option1.option;
    var option1ID = req.body.option1.id;

    var option2 = req.body.option2.option;
    var option2ID = req.body.option2.id;

    var option3 = req.body.option3.option;
    var option3ID = req.body.option3.id;

    var option4 = req.body.option4.option;
    var option4ID = req.body.option4.id;

    updateQnQuery = 'UPDATE QUIZ SET QUIZ_QUESTION = ? WHERE QUIZ_ID = ?'

    var count = 0;
    var anyErr = false;

    conn.query(updateQnQuery, [question,quizID], function(err,result){
        if (err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}));
            anyErr = true;
        } else{
            updateOptionQuery = 'UPDATE QUIZ_OPTION SET QUIZ_OPTION = ? WHERE QUIZ_OPTION_ID = ? AND QUIZ_ID = ?'
            
            conn.query(updateOptionQuery, [option1,option1ID,quizID], function(err, data){
                if (err){
                    console.log(err);
                    res.send(JSON.stringify({success: "false"}));
                    anyErr = true;
                    count += 1;
                }else {
                    count += 1;
                    if(!anyErr && count == 4){
                        res.send(JSON.stringify({success: "true"}));
                    }
                }
            });

            conn.query(updateOptionQuery, [option2,option2ID,quizID], function(err, data){
                if (err){
                    console.log(err);
                    res.send(JSON.stringify({success: "false"}));
                    anyErr = true;
                    count += 1;
                }else {
                    count += 1;
                    if(!anyErr && count == 4){
                        res.send(JSON.stringify({success: "true"}));
                    }
                }
            });

            conn.query(updateOptionQuery, [option3,option3ID,quizID], function(err, data){
                if (err){
                    console.log(err);
                    res.send(JSON.stringify({success: "false"}));
                    anyErr = true;
                    count += 1;
                }else {
                    count += 1;
                    if(!anyErr && count == 4){
                        res.send(JSON.stringify({success: "true"}));
                    }
                }
            });

            conn.query(updateOptionQuery, [option4,option4ID,quizID], function(err, data){
                if (err){
                    console.log(err);
                    res.send(JSON.stringify({success: "false"}));
                    anyErr = true;
                    count += 1;
                }else {
                    count += 1;
                    if(!anyErr && count == 4){
                        res.send(JSON.stringify({success: "true"}));
                    }
                }
            });
        }
    });


});
module.exports = router;
