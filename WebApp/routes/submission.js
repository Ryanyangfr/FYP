const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const path = require('path');

const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();
// var utility = require('../utility.js');
// var multipartMiddleware = multipart();

const conn = mysql.createConnection(databaseConfig, { charset : 'utf8' });
const submissionDir = './images/submission';
// get number of data in the database
let submission_index = 0;
let multimedia_index = 0;
conn.query('SELECT MAX(SUBMISSION_ID) as SUBMISSION_ID FROM SUBMISSION', (err, data) => {
  if (err) {
    console.log(err);
  }

  // console.log(data[0].submission_id);

  if (data[0].submission_id === undefined) {
    conn.query('select count(*) as count from SUBMISSION', (err, data2) => {
      if (err) {
        console.log(`error: ${err}`);
      }
      // console.log(data2[0].count);
      submission_index = data2[0].count;
    });
  } else {
    // console.log(data[0]);
    const index = data[0].SUBMISSION_ID + 1;
    submission_index = index;
  }
});

conn.query('SELECT MAX(MULTIMEDIA_ID) as MULTIMEDIA_ID FROM MULTIMEDIA', (err, data) => {
  if (err) {
    console.log(err);
  }

  // console.log(data[0].submission_id);

  if (data[0].MULTIMEDIA_ID === undefined) {
    multimedia_index = 1;
  } else {
    // console.log(data[0]);
    const index = data[0].MULTIMEDIA_ID + 1;
    multimedia_index = index;
  }
});

console.log(`submission index: ${submission_index}`);

router.post('/uploadSubmission', multipart({ uploadDir: submissionDir }), (req, res) => {
  // console.log(req.files);
  const submission_id = submission_index;
  submission_index++;
  const team_id = req.body.team_id;
  const trail_instance_id = req.body.trail_instance_id;
  const question = req.body.question;
  const hotspot = req.body.hotspot;

  // var time = utility.getDateTime();
  const io = req.app.get('socketio');
  console.log(req);
  console.log(req.body);
  console.log(`question: ${question}`);

  conn.query('SELECT QUESTION_ID FROM SUBMISSION_QUESTION WHERE QUESTION = ?', question, (err, data) => {
    if (err) {
      console.log(err);
    }
    else if (data[0] == undefined) {
      conn.query('SELECT QUESTION_ID FROM DRAWING_QUESTION WHERE QUESTION = ?', question, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const question_id = data[0].QUESTION_ID;

          fs.readFile(req.files.image.path, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(req.files.image.path);
              if (req.files) {
                res.send(JSON.stringify({ success: 'true' }))
              } else {
                res.send(JSON.stringify({ success: 'false' }));
              }
              const image_path = req.files.image.path
              const new_image_path = path.normalize(`${submissionDir}/${image_path.substring(
                0, image_path.lastIndexOf('\\')+1)
              }${req.files.image.name}`);
              console.log();
              console.log(image_path);
              // console.log(image_path.lastIndexOf('\\')+1);
              // console.log(req.files.image.name);
              fs.rename(image_path, new_image_path, (err) => {
                // res.send(err);
                console.log(err);
              });

              const query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, SUBMISSION_QUESTION_ID, DRAWING_QUESTION_ID) VALUES (?,?,?,?,?,?)';

              console.log(`submission: ${submission_id}`);
              console.log(`image url: ${new_image_path}`);
              console.log(`team id: ${team_id}`);
              console.log(`trail instance id: ${trail_instance_id}`);
              console.log(`question id: ${question_id}`);


              conn.query(query, [submission_id, new_image_path, team_id, trail_instance_id, null, question_id], (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('submission successfully loaded');
                  queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1 WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

                  conn.query(queryUpdate_hotspot, [team_id, trail_instance_id, hotspot], (err, row) => {
                    if (err) {
                      console.log(err);
                    } else {
                      // io.emit('submissionUpdate', {team_id: team_id, trail_instance_id: trail_instance_id});
                      io.emit('activityFeed', { time: '12345678sadasd2312312', team: team_id, hotspot: hotspot });
                      console.log('updated hotspot status');
                    }
                  });
                }
              });
            }
          });
        }
      })
    } else {
      const question_id = data[0].QUESTION_ID;
      console.log(req.files.image.path);
      fs.readFile(req.files.image.path, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(req.files.image.path);
          if (req.files) {
            res.send(JSON.stringify({ success: 'true' }))
          } else {
            res.send(JSON.stringify({ success: 'false' }));
          }
          const image_path = req.files.image.path;
          const new_image_path = path.normalize(`${submissionDir}/${image_path.substring(
            0, image_path.lastIndexOf('\\')+1,
          )
          }${req.files.image.name}`);
          console.log();
          console.log(image_path);
          // console.log(image_path.lastIndexOf('\\')+1);
          // console.log(req.files.image.name);
          fs.rename(image_path, new_image_path, (err) => {
            // res.send(err);
            console.log(err);
          });

          const query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, SUBMISSION_QUESTION_ID, DRAWING_QUESTION_ID) VALUES (?,?,?,?,?,?)'

          console.log(`submission: ${submission_id}`);
          console.log(`image url: ${new_image_path}`);
          console.log(`team id: ${team_id}`);
          console.log(`trail instance id: ${trail_instance_id}`);
          console.log(`question id: ${question_id}`);


          conn.query(query, [submission_id, new_image_path, team_id, trail_instance_id, question_id, null], (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log('submission successfully loaded');
              const queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1 WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

              conn.query(queryUpdate_hotspot, [team_id, trail_instance_id, hotspot], (err, row) => {
                if (err) {
                  console.log(err);
                } else {
                  io.emit('activityFeed', { time: 'dasfjoasjfoahofhdoasj', team: team_id, hotspot: hotspot });
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
router.post('/uploadMultimedia', multipart({ uploadDir: submissionDir }), (req, res) => {
  // var isClue = req.body.isclue;
  console.log(req);
  const image_path = req.files.image.path
  const new_image_path = path.normalize(`${submissionDir}/${
    req.files.image.name}`);
  console.log(`image path: ${new_image_path}`);

  fs.readFile(req.files.image.path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(req.files.image.path);
      if (req.files) {
        res.send('Uploaded!!!');
      }
      console.log();
      console.log(image_path);
      // console.log(image_path.lastIndexOf('\\')+1);
      // console.log(req.files.image.name);
      fs.rename(image_path, new_image_path, (err) => {
        // res.send(err);
        console.log(err);
      });

      const query = 'INSERT INTO MULTIMEDIA(MULTIMEDIA_ID, MULTIMEDIA_URL) VALUES (?,?)';

      conn.query(query, [multimedia_index, new_image_path], (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Multimedia successfully loaded');
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

router.get('/getSubmissionQuestion', (req, res) => {
  const instance_id = req.query.trail_instance_id;
  const query = 'SELECT HOTSPOT_NAME, QUESTION FROM TRAIL_HOTSPOT AS TH, MISSION AS M, SUBMISSION_QUESTION AS SQ WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TH.MISSION_ID = M.MISSION_ID AND TH.MISSION_ID = SQ.MISSION_ID';
  const response = [];

  conn.query(query, instance_id, (err, result) => {
    result.forEach((row) => {
      response.push({ hotspot: row.HOTSPOT_NAME, question: row.QUESTION });
    });
    console.log(response);
    res.send(response);
  })
})

router.get('/getDrawingQuestion', (req, res) => {
  const instance_id = req.query.trail_instance_id;
  const query = 'SELECT HOTSPOT_NAME, QUESTION FROM TRAIL_HOTSPOT AS TH, MISSION AS M, DRAWING_QUESTION AS DQ WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TH.MISSION_ID = M.MISSION_ID AND TH.MISSION_ID = DQ.MISSION_ID';
  const response = []

  conn.query(query, instance_id, (err, result) => {
    result.forEach((row) => {
      response.push({ hotspot: row.HOTSPOT_NAME, question: row.QUESTION });
    });
    console.log(response);
    res.send(response);
  })
})

router.get('/getAllSubmissionURL', (req, res) => {
  const team = req.query.team;
  const instance_id = req.query.trail_instance_id;
  const response = [];

  console.log(`team: ${team}`);
  console.log(`instance_id: ${instance_id}`);

  const query = 'SELECT SUBMISSION_IMAGE_URL, QUESTION, HOTSPOT_NAME FROM SUBMISSION AS S, SUBMISSION_QUESTION AS SQ, MISSION AS M, TEAM_HOTSPOT AS TH WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND S.SUBMISSION_QUESTION_ID = SQ.QUESTION_ID AND M.MISSION_ID = SQ.MISSION_ID AND TH.MISSION_ID = M.MISSION_ID';

  conn.query(query, [team, instance_id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      rows.forEach((row) => {
        response.push({ submissionURL: row.SUBMISSION_IMAGE_URL, hotspot: row.HOTSPOT_NAME, question: row.QUESTION });
      });

      const drawing_query = 'SELECT SUBMISSION_IMAGE_URL, QUESTION, HOTSPOT_NAME FROM SUBMISSION AS S, DRAWING_QUESTION AS DQ, MISSION AS M, TEAM_HOTSPOT AS TH WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND S.DRAWING_QUESTION_ID = DQ.QUESTION_ID AND M.MISSION_ID = DQ.MISSION_ID AND M.MISSION_ID = TH.MISSION_ID';

      conn.query(drawing_query, [team, instance_id], (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const num_submission_query = 'SELECT COUNT(*) AS COUNT FROM SUBMISSION WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';
          data.forEach((row) => {
            response.push({ submissionURL: row.SUBMISSION_IMAGE_URL, hotspot: row.HOTSPOT_NAME, question: row.QUESTION });
          });

          // conn.query(num_submission_query, [team, instance_id], function(err, count_row){
          //     if (err){
          //         console.log(err);
          //     }else {
          //         response.push({size: count_row[0].COUNT});
          //     }
          console.log(response);
          res.send(JSON.stringify(response, null, 3))
          // })
        }
      });
    }
  });
});

router.get('/getSubmission', (req, res) => {
  const image_url = req.query.url;
  const parentDir = path.normalize(`${__dirname}/..`);
  console.log(`image_url: ${image_url}`);
  res.sendFile(path.normalize(`${parentDir}/${image_url}`));
});

router.get('/getAllSubmissionQuestion', (req, res) => {
  const response = [];
  const query = 'SELECT * FROM SUBMISSION_QUESTION';

  conn.query(query, (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      questions.forEach((question) => {
        response.push({ id: question.QUESTION_ID, question: question.QUESTION });
      });
      res.send(response);
    }
  });
});
module.exports = router;
