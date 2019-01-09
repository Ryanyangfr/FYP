var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var path = require('path');

var databaseConfig = require('../config/mysqlconf.js');

// var multipartMiddleware = multipart();

var conn = mysql.createConnection(databaseConfig, {charset : 'utf8'});
var submissionDir = './images/submission';
//get number of data in the database
var submission_index = 0;
var multimedia_index = 0;
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

conn.query('SELECT MAX(MULTIMEDIA_ID) as MULTIMEDIA_ID FROM MULTIMEDIA', function(err,data){
    if(err){
        console.log(err);
    }

    // console.log(data[0].submission_id);

    if(data[0].MULTIMEDIA_ID === undefined){
            multimedia_index = 1;
    } else{
        // console.log(data[0]);
        var index = data[0].MULTIMEDIA_ID + 1;
        multimedia_index = index;
    }
    

})

console.log("submission index: " + submission_index);

router.post('/uploadSubmission', multipart({ uploadDir: submissionDir}), function(req,res){
    // console.log(req.files);
    var submission_id = submission_index;
    submission_index++;
    var team_id = req.body.team_id;
    var trail_instance_id = req.body.trail_instance_id;
    var question = req.body.question;
    var hotspot = req.body.hotspot;
    console.log(req);
    console.log(req.body);
    console.log('question: ' + question);

    conn.query('SELECT QUESTION_ID FROM SUBMISSION_QUESTION WHERE QUESTION = ?', question, function(err, data){
        if(err){
            console.log(err);
        }
        else if(data[0] == undefined){
            conn.query('SELECT QUESTION_ID FROM DRAWING_QUESTION WHERE QUESTION = ?', question, function(err, data){
                if(err){
                    console.log(err);
                }else {
                    var question_id = data[0].QUESTION_ID;

                    fs.readFile(req.files.image.path, function(err,data){
                        if (err){
                            console.log(err);
                        } else{
                            // console.log(req.files.image.path);
                            if(req.files){
                                res.send(JSON.stringify({success: "true"}))
                            }else{
                                res.send(JSON.stringify({success: "false"}));
                            }
                            var image_path = req.files.image.path
                            var new_image_path = path.normalize(submissionDir + '/' + image_path.substring(
                                                0,image_path.lastIndexOf('\\')+1)
                                                + req.files.image.name);
                                console.log();
                                console.log(image_path);
                                // console.log(image_path.lastIndexOf('\\')+1);
                                // console.log(req.files.image.name);
                            fs.rename(image_path, new_image_path, function(err){
                                // res.send(err);
                                console.log(err);
                            });
                    
                            var query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, SUBMISSION_QUESTION_ID, DRAWING_QUESTION_ID) VALUES (?,?,?,?,?,?)'
                    
                            console.log("submission: " + submission_id);
                            console.log("image url: " + new_image_path);
                            console.log("team id: " + team_id);
                            console.log("trail instance id: " + trail_instance_id);
                            console.log("question id: " + question_id);
                            
                        
                            conn.query(query,[submission_id, new_image_path, team_id, trail_instance_id, null, question_id],function(err,data){
                                if (err){
                                    console.log(err);
                                } else{
                                    console.log('submission successfully loaded');
                                    queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1 WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

                                    conn.query(queryUpdate_hotspot, [team_id, trail_instance_id, hotspot], function(err, row){
                                        if (err){
                                            console.log(err);
                                        }else {
                                            console.log('updated hotspot status');
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            })

        } else{
            var question_id = data[0].QUESTION_ID;

            fs.readFile(req.files.image.path, function(err,data){
                if (err){
                    console.log(err);
                } else{
                    // console.log(req.files.image.path);
                    if(req.files){
                        res.send(JSON.stringify({success: "true"}))
                    }else{
                        res.send(JSON.stringify({success: "false"}));
                    }
                    var image_path = req.files.image.path
                    var new_image_path = path.normalize(submissionDir + '/' + image_path.substring(
                                        0,image_path.lastIndexOf('\\')+1)
                                        + req.files.image.name);
                        console.log();
                        console.log(image_path);
                        // console.log(image_path.lastIndexOf('\\')+1);
                        // console.log(req.files.image.name);
                    fs.rename(image_path, new_image_path, function(err){
                        // res.send(err);
                        console.log(err);
                    });
            
                    var query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, SUBMISSION_QUESTION_ID, DRAWING_QUESTION_ID) VALUES (?,?,?,?,?,?)'
            
                    console.log("submission: " + submission_id);
                    console.log("image url: " + new_image_path);
                    console.log("team id: " + team_id);
                    console.log("trail instance id: " + trail_instance_id);
                    console.log("question id: " + question_id);
                    
                
                    conn.query(query,[submission_id, new_image_path, team_id, trail_instance_id, question_id, null],function(err,data){
                        if (err){
                            console.log(err);
                        } else{
                            console.log('submission successfully loaded');
                            queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1 WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

                            conn.query(queryUpdate_hotspot, [team_id, trail_instance_id, hotspot], function(err, row){
                                if (err){
                                    console.log(err);
                                }else {
                                    console.log('updated hotspot status');
                                }
                            });
                        }
                    })
                }
            })
        }
    })
    // console.log(req);

    
    
})
router.post('/uploadMultimedia', multipart({ uploadDir: submissionDir}), function(req,res){
    // var isClue = req.body.isclue;
    console.log(req);
    var image_path = req.files.image.path
    var new_image_path = path.normalize(submissionDir + '/'
                        + req.files.image.name);
    console.log("image path: " + new_image_path);

    fs.readFile(req.files.image.path, function(err,data){
        if (err){
            console.log(err);
        } else{
            // console.log(req.files.image.path);
            if(req.files){
                res.send("Uploaded!!!");
            }
                console.log();
                console.log(image_path);
                // console.log(image_path.lastIndexOf('\\')+1);
                // console.log(req.files.image.name);
            fs.rename(image_path, new_image_path, function(err){
                // res.send(err);
                console.log(err);
            });

            var query = "INSERT INTO MULTIMEDIA(MULTIMEDIA_ID, MULTIMEDIA_URL) VALUES (?,?)";

            conn.query(query, [multimedia_index, new_image_path], function(err,rows){
                if (err){
                    console.log(err);
                }else{
                    console.log("Multimedia successfully loaded");
                    multimedia_index++;
                }
            })
        }
    })
})

// router.get('/getSubmission', function(req,res){
//     // var query = 'SELECT SUBMISSION_IMAGE_URL FROM SUBMISSION'
//     // conn.query(query, function(err, data){
//     //     if(err){
//     //         console.log(err);
//     //     } else{
//     //         for(var i=0; i<data.length; i++){
//     //             var image_url = data[i].SUBMISSION_IMAGE_URL;
//     //         }
//     //     }

//     // })

//     var team_id = req.query.team_id;
//     var trail_instance_id = req.query.trail_instance_id;
//     var question = req.query.question;

//     // console.log(question);

//     conn.query('SELECT QUESTION_ID FROM SUBMISSION_QUESTION WHERE QUESTION = ?', question, function(err, data){
//         if (err){
//             console.log("error here: " + err);
//         } else{
//             var question_id = data[0].QUESTION_ID;
//             var query = 'SELECT SUBMISSION_IMAGE_URL FROM SUBMISSION WHERE QUESTION_ID = ? AND TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

//             var sqlQuery = conn.query(query, [question_id,team_id,trail_instance_id], function(err, data2){
//                 if(err){
//                     console.log(sqlQuery.sql);
//                 } else{
//                     var parentDir = path.normalize(__dirname + "/..");
//                     res.sendFile(path.normalize(parentDir + '/' + data2[0].SUBMISSION_IMAGE_URL));
//                 }
//             })
//         }
//     });
// })

router.get('/getSubmissionQuestion', function(req,res){
    var instance_id = req.query.trail_instance_id;
    var query = 'SELECT HOTSPOT_NAME, QUESTION FROM TRAIL_MISSION AS TM, MISSION AS M, SUBMISSION_QUESTION AS SQ WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TM.MISSION_ID = M.MISSION_ID AND TM.MISSION_ID = SQ.MISSION_ID';
    var response = [];
   
    conn.query(query, instance_id, function(err, result){
        result.forEach(function(row){
            response.push({hotspot: row.HOTSPOT_NAME, question: row.QUESTION});
        });
        console.log(response);
        res.send(response);
    })
})

router.get('/getAllSubmissionURL', function(req,res){
    var team = req.query.team;
    var instance_id = req.query.trail_instance_id;
    var response = [];
    
    console.log('team: ' + team);
    console.log('instance_id: ' + instance_id);

    var query = 'SELECT SUBMISSION_IMAGE_URL, QUESTION, HOTSPOT_NAME FROM SUBMISSION AS S, SUBMISSION_QUESTION AS SQ, MISSION AS M WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND S.SUBMISSION_QUESTION_ID = SQ.QUESTION_ID AND M.MISSION_ID = SQ.MISSION_ID';

    conn.query(query, [team, instance_id], function(err, rows){
        if (err){
            console.log(err);
        }else{
            rows.forEach(function(row){
                response.push({SubmissionURL: row.SUBMISSION_IMAGE_URL, hotspot: row.HOTSPOT_NAME, question: row.QUESTION});
            });

            var drawing_query = 'SELECT SUBMISSION_IMAGE_URL, QUESTION, HOTSPOT_NAME FROM SUBMISSION AS S, DRAWING_QUESTION AS DQ, MISSION AS M WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND S.DRAWING_QUESTION_ID = DQ.QUESTION_ID AND M.MISSION_ID = DQ.MISSION_ID';

            conn.query(drawing_query, [team, instance_id], function(err, data){
                if (err){
                    console.log(err);
                }else{
                    var num_submission_query = 'SELECT COUNT(*) AS COUNT FROM SUBMISSION WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';
                    data.forEach(function(row){
                        response.push({SubmissionURL: row.SUBMISSION_IMAGE_URL, hotspot: row.HOTSPOT_NAME, question: row.QUESTION});
                    });

                    conn.query(num_submission_query, [team, instance_id], function(err, count_row){
                        if (err){
                            console.log(err);
                        }else {
                            response.push({size: count_row[0].COUNT});
                        }
                        console.log(response);
                        res.send(JSON.stringify(response, null, 3))
                    })
                }
            })
        }
    });
})

router.get('/getSubmission', function(req,res){
    var image_url = req.query.url;
    var parentDir = path.normalize(__dirname + "/..");
    res.sendFile(path.normalize(parentDir + '/' + image_url));
})

module.exports = router;
