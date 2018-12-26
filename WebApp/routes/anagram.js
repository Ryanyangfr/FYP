var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getAnagrams', function(req,res){
    var trail_instance_id = req.query.trail_instance_id
    var query = 'SELECT M.MISSION_ID, HOTSPOT_NAME FROM TRAIL_MISSION AS TM, MISSION AS M WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TM.MISSION_ID = M.MISSION_ID';
    var response = [];

    conn.query(query, trail_instance_id, function(err, rows){
        if(err){
            console.log(err)
        } else{
            var count = 0;
            rows.forEach(function(row){
                var mission = row.MISSION_ID;
                var hotspot = row.HOTSPOT_NAME;

                mission_query = 'SELECT ANAGRAM.ANAGRAM_WORD FROM ANAGRAM WHERE MISSION_ID = ?';

                conn.query(mission_query, mission, function(err, anagram){
                    if(err){
                        count += 1;
                    }else{
                        var word = anagram.ANAGRAM_WORD;
                        response.push({hotspot: hotspot, anagram:word});
                        console.log(word);
                        console.log(count);
                        count += 1;
                    }
                })
                // console.log(count);
                // console.log(rows.length)
            })
            while(count != rows.length){
                // console.log('count: ' + count);
                // console.log('length: ' + rows.length);
            }
            res.send(response);
        }
    })
})

module.exports=router;