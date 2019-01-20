var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getHotspots', function(req,res){
    var query = 'SELECT * FROM HOTSPOT';
    var response = [];

    conn.query(query, function(err, hotspots){
        if(err){
            console.log(err)
        } else{
            hotspots.forEach(function(hotspot){
                var hspot = hotspot.HOTSPOT_NAME;
                var lat = hotspot.LATITUDE;
                var long = hotspot.LONGTITUDE;
                var narrative = hotspot.NARRATIVE;

                response.push({hotspot_name: hspot, latitude: lat, longtitude: long, narrative: narrative});
            })
            console.log(response)
            res.send(JSON.stringify(response, null, 3))
        }
    })

})

module.exports = router;
