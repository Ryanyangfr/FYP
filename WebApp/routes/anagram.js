var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getAnagrams', function(req,res){
    var trail_instance_id = req.query.trail_instance_id
    var query = 'SELECT MISSION_ID, HOTSPOT_NAME FROM TRAIL_HOTSPOT WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ? ORDER BY MISSION_ID)';
    var response = [];

    conn.query(query, trail_instance_id, function(err, rows){
        if(err){
            console.log(err)
        } else{
            var count = 0;
            rows.forEach(function(row){
                var mission = row.MISSION_ID;
                var hotspot = row.HOTSPOT_NAME;

                mission_query = 'SELECT * FROM ANAGRAM WHERE MISSION_ID = ?';

                console.log(mission);
                conn.query(mission_query, mission, function(err, anagram){
                    if(err){
                        console.log('error: ' + err);
                        count += 1;
                    }else{
                        // console.log(anagram.ANAGRAM_WORD);
                        // console.log('word: ' + anagram[0]);
                        if(anagram[0] != undefined){
                            var word = anagram[0].ANAGRAM_WORD;
                            response.push({hotspot: hotspot, anagram:word});
                            console.log('word: ' + word);
                        }
                        
                        // console.log(word);
                        // console.log(count);
                        count += 1;
                        console.log('count: ' + count);
                        console.log('row.length: ' + rows.length);
                        if(count == rows.length){
                            res.send(response);
                        }
                    }
                })
                // console.log(count);
                // console.log(rows.length)
            })
            // while(count != rows.length){
            //     // console.log('count: ' + count);
            //     // console.log('length: ' + rows.length);
            // }
            // res.send(response);
        }
    })
})

router.get('/getAllAnagrams', (req,res) => {
    const query = 'SELECT * FROM ANAGRAM, MISSION WHERE ANAGRAM.MISSION_ID = MISSION.MISSION_ID';
    const response = [];

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data.forEach((row) => {
                response.push({id: row.ANAGRAM_ID, word: row.ANAGRAM_WORD, title: row.MISSION_TITLE})
            });
            console.log(`anagram: `);
            console.log(response);
            res.send(response);
        }
    })
})

module.exports=router;