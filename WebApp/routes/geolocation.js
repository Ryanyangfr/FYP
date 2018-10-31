var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getAllHotspots', function(req,res){
    var trail_instance_id = req.query.trail_instance_id;
    var query = 'SELECT * FROM TRAIL_HOTSPOT WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?)';

    conn.query(query, trail_instance_id, function(err,result){
        if(err){
            console.log('query 1 error: ' + err);
        } else{
            console.log('result: ' + result);
            var response = [];
            result.forEach(function(element){
                var hotspot_name = element.HOTSPOT_NAME;
                var lat = element.LATITUDE;
                var long = element.LONGTITUDE;

                response.push({coordinates: [lat,long],
                            name: hotspot_name});
            })

        res.end(JSON.stringify(response, null, 4));
        }
    });

});

module.exports = router;