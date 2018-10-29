var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var path = require('path');

var databaseConfig = require('../config/mysqlconf.js');

// var multipartMiddleware = multipart();

var conn = mysql.createConnection(databaseConfig);
var submissionDir = './images/submission';
//get number of data in the database
var submission_index = 0;
conn.query('SELECT MAX(SUBMISSION_ID) as SUBMISSION_ID FROM SUBMISSION', function(err,data){
    if(err){
        console.log(err);
    }

    // console.log(data[0].submission_id);

    if(data[0].submission_id === undefined){
        conn.query('select count(*) as count from SUBMISSION', function(err, data2){
                if (err){
                    console.log("error: " + err);
                }
                // console.log(data2[0].count);
                submission_index = data2[0].count;
        })
    } else{
        // console.log(data[0]);
        var index = data[0].SUBMISSION_ID + 1;
        submission_index = index;
    }
    

})

console.log("submission index: " + submission_index);

router.post('/uploadSubmission', multipart({ uploadDir: submissionDir}), function(req,res){
    // console.log(req.files);
    var submission_id = submission_index;
    submission_index++;
    var team_id = req.body.team_id;
    var trail_instance_id = req.body.trail_instance_id;
    var question = req.body.question

    conn.query('SELECT QUESTION_ID FROM SUBMISSION_QUESTION WHERE QUESTION = ?', question, function(err, data){
        if(err){
            console.log(err);
        }
        
        var question_id = data[0].QUESTION_ID;

        fs.readFile(req.files.image.path, function(err,data){
            // console.log(req.files.image.path);
            if(req.files){
                res.send("Uploaded!!!");
            }
            var image_path = req.files.image.path
            var new_image_path = path.normalize(submissionDir + '/' + image_path.substring(
                                0,image_path.lastIndexOf('\\')+1)
                                + req.files.image.name);
                console.log();
                // console.log(image_path);
                // console.log(image_path.lastIndexOf('\\')+1);
                // console.log(req.files.image.name);
            fs.rename(image_path, new_image_path, function(err){
                // res.send(err);
            });
    
            var query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, QUESTION_ID) VALUES (?,?,?,?,?)'
    
            console.log("submission: " + submission_id);
            console.log("image url: " + new_image_path);
            console.log("team id: " + team_id);
            console.log("trail instance id: " + trail_instance_id);
            console.log("question id: " + question_id);
            
        
            conn.query(query,[submission_id, new_image_path, team_id, trail_instance_id, question_id],function(err,data){
                if (err){
                    console.log(err);
                } else{
                    console.log('submission successfully loaded');
                }
            })
        })
    })
    // console.log(req);

    
    
})

router.get('/getAllSubmissions', function(req,res){
    var query = 'SELECT SUBMISSION_IMAGE_URL FROM SUBMISSION'
    conn.query(query, function(err, data){
        if(err){
            console.log(err);
        } else{
            for(var i=0; i<data.length; i++){
                var image_url = data[i].SUBMISSION_IMAGE_URL;
                
            }
        }

    })
})
module.exports = router;
