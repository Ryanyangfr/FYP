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
                count += 1;
                var mission = missionRow.MISSION_ID;
                var hotspot_name = missionRow.HOTSPOT_NAME;
                // console.log(mission)
                mission_query = 'SELECT DRAGANDDROP_QUESTION, DRAGANDDROP_QUESTION_OPTION, DRAGANDDROP_QUESTION_ANSWER FROM DRAG_AND_DROP, DRAG_AND_DROP_OPTION WHERE DRAG_AND_DROP.DRAGANDDROP_ID = DRAG_AND_DROP_OPTION.DRAGANDDROP_ID AND MISSION_ID = ?';

                conn.query(mission_query, mission, function(err, drag_and_drop_details){
                    console.log(mission);
                    console.log(hotspot_name);
                    if (err){
                        console.log(err);
                        // number = number + 1;
                    } else{
                        // console.log(drag_and_drop_details);
                        drag_and_drop_ = []
                        if (drag_and_drop_details.length != 0){
                            drag_and_drop_details.forEach(function(detail, i){
                                drag_and_drop_.push({drag_and_drop_question:detail.DRAGANDDROP_QUESTION_OPTION,  drag_and_drop_answer: detail.DRAGANDDROP_QUESTION_ANSWER})
                            })
                            // console.log(drag_and_drop_)
                            response.push({hotspot: hotspot_name, question: drag_and_drop_details[0].DRAGANDDROP_QUESTION, drag_and_drop: drag_and_drop_});
                            console.log('count: ' + typeof count);
                            console.log('mission length: ' + typeof missions.length);
                            if(count == missions.length){
                                res.end(JSON.stringify(response, null, 3));
                                console.log('count: ' + count);
                                console.log('mission length: ' + missions.length);
                            }
                            
                        }                        // number = number + 1;
                    }
                })
            })
            if (missions.length == 0) {
                res.send([]);
            }
        }
        console.log(response)
        
    })
})

module.exports = router;








