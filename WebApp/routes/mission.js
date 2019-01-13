var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getMission', function(req,res){
    var response = [];
    var hotspot = req.query.hotspot;
    var query = 'SELECT * FROM MISSION WHERE HOTSPOT_NAME = ?';

    conn.query(query, hotspot, function(err, data){
        if(err){
            console.log(err);
        }else {
            for(var index in data){
                response.push({mission: data[index].MISSION_ID});
            }
            res.send(response);
        }
    });

});

module.exports = router;