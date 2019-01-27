var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getMissionQuiz', function(req,res){
    var response = [];
    // var hotspot = req.query.hotspot;
    var query = 'SELECT * FROM MISSION WHERE MISSION.MISSION_ID IN (SELECT MISSION_ID FROM QUIZ)';
    conn.query(query, function(err, data){
        if(err){
            console.log(err);
        }else {
            for(var index in data){
                response.push({mission: data[index].MISSION_ID, title: data[index].MISSION_TITLE});
            }
            res.send(response);
        }
    });
});

router.get('/getMissionWefie', function(req,res){
    var response = [];
    // var hotspot = req.query.hotspot;
    var query = 'SELECT * FROM MISSION WHERE MISSION.MISSION_ID IN (SELECT MISSION_ID FROM SUBMISSION_QUESTION)';
    conn.query(query, function(err, data){
        if(err){
            console.log(err);
        }else {
            for(var index in data){
                response.push({mission: data[index].MISSION_ID, title: data[index].MISSION_TITLE});
            }
            res.send(response);
        }
    });
});

module.exports = router;