var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/deleteHotspot', function(req,res){
    var hotspotName = req.body.hotspot_name.value
    
    console.log(hotspotName);
    var query = 'DELETE FROM HOTSPOT WHERE HOTSPOT_NAME = ?'

    conn.query(query, hotspotName, function(err, data){
        if(err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}))
        }else{
            res.send(JSON.stringify({success: "true"}));
        }
    })
})

router.post('/deleteNarrative', function(req,res){
    var narrative_id = req.body.narrative_id
    
    console.log(narrative_id);
    var query = 'DELETE FROM NARRATIVE WHERE NARRATIVE_ID = ?'

    conn.query(query, narrative_id, function(err, data){
        if(err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}));
        }else{
            res.send(JSON.stringify({success: "true"}));
        }
    })
})

router.post('/deleteQuiz', function(req,res){
    var mission_id = req.body.mission_id
    
    console.log(mission_id);
    var query = 'SELECT QUIZ_ID FROM QUIZ WHERE MISSION_ID = ?';

    conn.query(query, mission_id, function(err, rows){
        if (err){
            console.log(err);
        } else{
            var deleteOptionsQuery = 'DELETE FROM QUIZ_OPTIONS WHERE QUIZ_ID = ?';
            var deleteQuizQuery = 'DELETE FROM QUIZ WHERE MISSION_ID = ?';
            var deleteMissionQuery = 'DELETE FROM MISSION WHERE MISSION_ID = ?';

            rows.forEach(function(row){
                conn.query(deleteOptionsQuery, row.QUIZ_ID, function(err,data){
                    if(err){
                        console.log(err);
                        res.send(JSON.stringify({success: "false"}));
                    } else{
                        conn.query(deleteQuizQuery, mission_id, function(err, data2){
                            if(err){
                                console.log(err);
                                res.send(JSON.stringify({success: "false"}));
                            } else{
                                conn.query(deleteMissionQuery, mission_id, function(err,data3){
                                    if(err){
                                        console.log(err);
                                        res.send(JSON.stringify({success: "false"}));
                                    }
                                });
                            }
                        });
                    }
                });
            });
            res.send(JSON.stringify({success: "true"}));
        }
    });
});

module.exports = router;

