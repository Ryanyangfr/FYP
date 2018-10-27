var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var databaseConfig = require('../config/mysqlconf.js');

// var multipartMiddleware = multipart();

var conn = mysql.createConnection(databaseConfig);
var submissionDir = './images/submission';
//get number of data in the database
var submission_index = conn.query('SELECT MAX(SUBMISSION_ID) as SUBMISSION_ID FROM SUBMISSION', function(err,data){
    if(err){
        console.log(err);
    }

    // console.log(data[0].submission_id);

    if(data[0].submission_id === undefined){
        conn.query('select count(*) as count from submission', function(err, data2){
                if (err){
                    console.log("error: " + err);
                }
                console.log(data2[0].count);
                return data2[0].count;
        })
    } else{
        console.log(data[0]);
        return ++data[0].SUBMISSION_ID;
    }
    

})

// console.log(submission_index);

router.post('/uploadSubmission', multipart({ uploadDir: submissionDir}), function(req,res){
    // console.log(req.files);
    // var submission_id = submission_index++;
    // var team_id = req.body.team_id;
    // var trail_instance_id = req.body.trail_instance.id;
    // var question = req.body.question

    // var question_id = conn.query('SELECT QUESTION_ID FROM SUBMISSION_QUESTION WHERE QUESTION = ?', question, function(err, data){
    //     if(err){
    //         console.log(err);
    //     }

    //     return data[0].QUESTION_ID;
    // })
    console.log(req);

    fs.readFile(req.files.image.path, function(err,data){
        // console.log(req.files.image.path);
        if(req.files){
            res.status(200).send("Uploaded!!!");
        }

        var image_path = req.files.image.path
        var new_image_path = image_path.substring(
                            0,image_path.lastIndexOf('\\')+1)
                            + req.files.image.name;
            // console.log(req.files);
            // console.log(image_path);
            // console.log(image_path.lastIndexOf('\\')+1);
            // console.log(req.files.image.name);
        fs.rename(image_path, new_image_path, function(err){
            // res.send(err);
        });
    })

    // var query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, QUESTION_ID) VALUES (?,?,?,?,?)'

    // console.log(submission_id);
    // console.log(new_image_path);
    // console.log(team_id);
    // console.log(trail_instance_id);
    // console.log(question_id);
    

    // conn.query(query,[submission_id, new_image_path, team_id, trail_instance_id, question_id],function(err,data){
    //     if (err){
    //         res.send(err);
    //     } else{
    //         console.log('submission successfully loaded');
    //     }
    // })

    // res.end('Submission Successful');
})

// router.get('getAllSubmissions', function(req,res){
//     var 
// })
module.exports = router;
