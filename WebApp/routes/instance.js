var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getInstance', function(req,res){
    query = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';
    console.log('getInstance called');
    conn.query(query, function(err,instance){
        if (err){
            console.log(err);
        } else{
            var instance_id = instance[0].TRAIL_INSTANCE_ID;
            res.end(JSON.stringify({trail_instance_id: instance_id}));
        }
    })
});

router.get('/completedHotspots', function(req,res){
    var instance_id = req.query.trail_instance_id;
    var team_id = req.query.team;
    var response = [];

    query = 'SELECT HOTSPOT_NAME, ISCOMPLETED FROM TEAM_HOTSPOT_STATUS WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

    conn.query(query, [team_id, instance_id], function(err, hotspot_statuses){
        hotspot_statuses.forEach(function(hotspot){
            console.log('hotspot: ' + hotspot.HOTSPOT_NAME);
            response.push({hotspot: hotspot.HOTSPOT_NAME, iscompleted: hotspot.ISCOMPLETED});
        })

        res.send(response);
    })
})

router.post('/createTrailInstance', cors(), function(req,res){
    
})

module.exports = router;