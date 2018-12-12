var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getDragAndDrop',function(req,res){
    var trail_instance_id = req.query.trail_instance_id;
    query = 'SELECT M.MISSION_ID, HOTSPOT_NAME FROM TRAIL_MISSION AS TM, MISSION AS M WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TM.MISSION_ID = M.MISSION_ID';
    var response = []

    conn.query(query, trail_instance_id, function(err, missions){
        if (err){
            console.log(err);
        }else{
            console.log(missions);
            missions.forEach(function(missionRow){
                var mission = missionRow.MISSION_ID;
                var hotspot_name = missionRow.HOTSPOT_NAME;
                mission_query = 'SELECT DRAGANDDROP_QUESTION, DRAGANDDROP_ANSWER FROM DRAG_AND_DROP WHERE MISSION_ID = ?';

                conn.query(mission_query, mission, function(err, drag_and_drop_details){
                    console.log(mission);
                    console.log(hotspot_name);
                    if (err){
                        console.log(err);
                        // number = number + 1;
                    } else{
                        drag_and_drop = []
                        if (drag_and_drop_details.length != 0){
                            drag_and_drop_details.forEach(function(detail, i){
                                drag_and_drop.push({drag_and_drop_question:detail.DRAGANDDROP_QUESTION,  drag_and_drop_answer: detail.DRAGANDDROP_ANSWER})
                            })
                            
                            response.push({hotspot: hotspot_name, drag_and_drop: drag_and_drop});
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
        }
    })
})

module.exports = router;








