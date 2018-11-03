var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var conn = mysql.createConnection(databaseConfig);

router.post('/updateScore', function(req,res){
    var team_id = req.body.team_id;
    var instance_id = req.body.trail_instance_id;
    var update = parseInt(req.body.score);
    var hotspot = req.body.hotspot
    
    console.log('team_id: ' + team_id);
    console.log('instance_id: ' + instance_id);
    console.log('score: ' + update);
    console.log('hotspot: ' + hotspot);

    var query = 'SELECT TEAM_POINTS FROM TEAM WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

    conn.query(query, [team_id, instance_id], function(err, team){
        if (err){
            console.log(err)
        } else{
            var points = team[0].TEAM_POINTS + update;
            console.log('points: ' + points);
            queryUpdate = 'UPDATE TEAM SET TEAM_POINTS = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';
            queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1 WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

            conn.query(queryUpdate_hotspot, [team_id, instance_id, hotspot], function(err, row){
                if (err){
                    console.log(err);
                }else {
                    console.log('updated hotspot status');
                }
            })
            conn.query(queryUpdate, [points, team_id, instance_id], function(err, data){
                if (err){
                    console.log(err);
                } else{
                    res.send('update successful');
                }
            })
        }
    })
})

router.get('/startingHotspot',function(req,res){
    var instance_id = req.query.trail_instance_id;
    var query = 'SELECT TH.HOTSPOT_NAME, LATITUDE, LONGTITUDE, N.NARRATIVE FROM TRAIL_HOTSPOT AS TH, HOTSPOT AS H, NARRATIVE AS N WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND H.HOTSPOT_NAME = TH.HOTSPOT_NAME AND H.NARRATIVE_ID = N.NARRATIVE_ID';
    var response = [];

    conn.query(query, instance_id, function(err, row){
        if (err){
            console.log(err);
        } else{
            // console.log(row[0]);
            conn.query('SELECT COUNT(*) as COUNT FROM TEAM WHERE TRAIL_INSTANCE_ID = ?', instance_id, function(err, row_count){
                var numTeams = row_count[0].COUNT;
                console.log(numTeams);
                for(var i=0; i<numTeams; i++){
                    response.push({team: i+1, startingHotspot: row[i].HOTSPOT_NAME, coordinates: [row[i].LATITUDE,row[i].LONGTITUDE], narrative: row[i].NARRATIVE});
                }

                res.send(response);
            })
        }
    })
})

router.get('/hotspotStatus', function(req,res){
    var instance_id = req.query.trail_instance_id;
    var response = [];

    query = 'SELECT TEAM.TEAM_ID, COUNT(ISCOMPLETED) AS COUNT FROM TEAM LEFT OUTER JOIN TEAM_HOTSPOT_STATUS ON TEAM.TRAIL_INSTANCE_ID = TEAM_HOTSPOT_STATUS.TRAIL_INSTANCE_ID AND TEAM.TEAM_ID = TEAM_HOTSPOT_STATUS.TEAM_ID AND ISCOMPLETED=1 WHERE TEAM.TRAIL_INSTANCE_ID = ? GROUP BY TEAM_ID';

    console.log('instance id: ' + instance_id);
    conn.query(query, instance_id, function(err, rows){
        if (err){
            console.log(err);
        } else{
            rows.forEach(function(row){
                response.push({team: row.TEAM_ID, hotspots_completed: row.COUNT});
            })
        }
    })
})

module.exports = router;