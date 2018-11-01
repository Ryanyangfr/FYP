var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var conn = mysql.createConnection(databaseConfig);

router.post('/updateScore', function(req,res){
    var team_id = req.body.team_id;
    var instance_id = req.body.trail_instance_id;
    var update = req.body.score;
    
    var query = 'SELECT TEAM_POINTS FROM TEAM WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

    conn.query(query, [team_id, instance_id], function(err, team){
        if (err){
            console.log(err)
        } else{
            var points = team.TEAM_POINTS + update;
            console.log('points: ' + points)
            queryUpdate = 'UPDATE TEAM SET TEAM_POINTS = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

            conn.query(queryUpdate, [points, team_id, trail_instance_id], function(err, data){
                if (err){
                    console.log(err);
                } else{
                    res.send('update successful');
                }
            })
        }
    })
})

module.exports = router;