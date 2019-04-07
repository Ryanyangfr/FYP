const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const multipart = require('connect-multiparty');
const path = require('path');

const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();
const utility = require('../utility.js');
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
  if (data[0].submission_id === undefined) {
    conn.query('select count(*) as count from SUBMISSION', (err, data2) => {
      if (err) {
        console.log(`error: ${err}`);
      }
      submission_index = data2[0].count;
    });
  } else {
    const index = data[0].SUBMISSION_ID + 1;
    submission_index = index;
  }
});

conn.query('SELECT MAX(MULTIMEDIA_ID) as MULTIMEDIA_ID FROM MULTIMEDIA', (err, data) => {
  if (err) {
    console.log(err);
  }

  if (data[0].MULTIMEDIA_ID === undefined) {
    multimedia_index = 1;
  } else {
    const index = data[0].MULTIMEDIA_ID + 1;
    multimedia_index = index;
  }
});

router.post('/uploadSubmission', multipart({ uploadDir: submissionDir }), (req, res) => {
  const submission_id = submission_index;
  submission_index++;
  const team_id = req.body.team_id;
  const trail_instance_id = req.body.trail_instance_id;
  const question = req.body.question;
  const hotspot = req.body.hotspot;

  const time = utility.getDateTime();
  const io = req.app.get('socketio');

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
              if (req.files) {
                res.send(JSON.stringify({ success: 'true' }));
              } else {
                res.send(JSON.stringify({ success: 'false' }));
              }
              const image_path = req.files.image.path;
              const new_image_path = path.normalize(`${submissionDir}/${image_path.substring(
                0, image_path.lastIndexOf('\\')+1)
              }${req.files.image.name}`);
              fs.rename(image_path, new_image_path, (err) => {
                console.log(err);
              });

              const query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, SUBMISSION_QUESTION_ID, DRAWING_QUESTION_ID, SUBMISSION_STATUS) VALUES (?,?,?,?,?,?,?)';

              conn.query(query, [submission_id, new_image_path, team_id, trail_instance_id, null, question_id, 'no grade'], (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  const queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1, TIME_COMPLETED = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

                  conn.query(queryUpdate_hotspot, [time, team_id, trail_instance_id, hotspot], (err, row) => {
                    if (err) {
                      console.log(err);
                    } else {
                      io.emit('activityFeed', { time, team: team_id, hotspot });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      const question_id = data[0].QUESTION_ID;
      fs.readFile(req.files.image.path, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (req.files) {
            res.send(JSON.stringify({ success: 'true' }));
          } else {
            res.send(JSON.stringify({ success: 'false' }));
          }
          const image_path = req.files.image.path;
          const new_image_path = path.normalize(`${submissionDir}/${image_path.substring(
            0, image_path.lastIndexOf('\\')+1,
          )
          }${req.files.image.name}`);
          fs.rename(image_path, new_image_path, (err) => {
            console.log(err);
          });

          const query = 'INSERT INTO SUBMISSION(SUBMISSION_ID, SUBMISSION_IMAGE_URL, TEAM_ID, TRAIL_INSTANCE_ID, SUBMISSION_QUESTION_ID, DRAWING_QUESTION_ID, SUBMISSION_STATUS) VALUES (?,?,?,?,?,?,?)';

          conn.query(query, [submission_id, new_image_path, team_id, trail_instance_id, question_id, null, 'no grade'], (err, data) => {
            if (err) {
              console.log(err);
            } else {
              const queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1, TIME_COMPLETED = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

              conn.query(queryUpdate_hotspot, [time, team_id, trail_instance_id, hotspot], (err, row) => {
                if (err) {
                  console.log(err);
                } else {
                  io.emit('activityFeed', { time, team: team_id, hotspot });
                }
              });
            }
          });
        }
      });
    }
  });
});

router.post('/uploadMultimedia', multipart({ uploadDir: submissionDir }), (req, res) => {
  const image_path = req.files.image.path;
  const new_image_path = path.normalize(`${submissionDir}/${
    req.files.image.name}`);

  fs.readFile(req.files.image.path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (req.files) {
        res.send('Uploaded!!!');
      }

      fs.rename(image_path, new_image_path, (err) => {
        console.log(err);
      });

      const query = 'INSERT INTO MULTIMEDIA(MULTIMEDIA_ID, MULTIMEDIA_URL) VALUES (?,?)';

      conn.query(query, [multimedia_index, new_image_path], (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          multimedia_index++;
        }
      });
    }
  });
});

router.get('/getSubmissionQuestion', (req, res) => {
  const instance_id = req.query.trail_instance_id;
  const query = 'SELECT HOTSPOT_NAME, QUESTION FROM TRAIL_HOTSPOT AS TH, MISSION AS M, SUBMISSION_QUESTION AS SQ WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TH.MISSION_ID = M.MISSION_ID AND TH.MISSION_ID = SQ.MISSION_ID';
  const response = [];

  conn.query(query, instance_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      result.forEach((row) => {
        response.push({ hotspot: row.HOTSPOT_NAME, question: row.QUESTION });
      });
    }
    res.send(response);
  });
});

router.get('/getDrawingQuestion', (req, res) => {
  const instance_id = req.query.trail_instance_id;
  const query = 'SELECT HOTSPOT_NAME, QUESTION FROM TRAIL_HOTSPOT AS TH, MISSION AS M, DRAWING_QUESTION AS DQ WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TH.MISSION_ID = M.MISSION_ID AND TH.MISSION_ID = DQ.MISSION_ID';
  const response = [];

  conn.query(query, instance_id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(response);
    } else {
      result.forEach((row) => {
        response.push({ hotspot: row.HOTSPOT_NAME, question: row.QUESTION });
      });
      res.send(response);
    }
  });
});

router.get('/getAllSubmissionURL', (req, res) => {
  const team = req.query.team;
  const instance_id = req.query.trail_instance_id;
  const response = [];

  const query = 'SELECT SUBMISSION_ID, TEAM_ID, SUBMISSION_IMAGE_URL, QUESTION, HOTSPOT_NAME, S.SUBMISSION_STATUS FROM SUBMISSION AS S, SUBMISSION_QUESTION AS SQ, TRAIL_HOTSPOT AS TH WHERE TEAM_ID = ? AND TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TRAIL_INSTANCE_ID = ? AND S.SUBMISSION_QUESTION_ID = SQ.QUESTION_ID AND TH.MISSION_ID = SQ.MISSION_ID;';

  conn.query(query, [team, instance_id, instance_id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      rows.forEach((row) => {
        response.push({
          submissionID: row.SUBMISSION_ID, submissionURL: row.SUBMISSION_IMAGE_URL, hotspot: row.HOTSPOT_NAME, question: row.QUESTION, status: row.SUBMISSION_STATUS 
        });
      });
      const drawing_query = 'SELECT SUBMISSION_ID, SUBMISSION_IMAGE_URL, QUESTION, HOTSPOT_NAME, S.SUBMISSION_STATUS FROM SUBMISSION AS S, DRAWING_QUESTION AS DQ, TRAIL_HOTSPOT AS TH WHERE TEAM_ID = ? AND TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TRAIL_INSTANCE_ID = ? AND S.DRAWING_QUESTION_ID = DQ.QUESTION_ID AND DQ.MISSION_ID = TH.MISSION_ID';

      conn.query(drawing_query, [team, instance_id, instance_id], (err, data) => {
        if (err) {
          console.log(err);
        } else {
          data.forEach((row) => {
            response.push({
              submissionID: row.SUBMISSION_ID, submissionURL: row.SUBMISSION_IMAGE_URL, hotspot: row.HOTSPOT_NAME, question: row.QUESTION, status: row.SUBMISSION_STATUS 
            });
          });
          res.send(JSON.stringify(response, null, 3));
        }
      });
    }
  });
});

router.get('/getSubmission', (req, res) => {
  const image_url = req.query.url;
  const parentDir = path.normalize(`${__dirname}/..`);
  res.sendFile(path.normalize(`${parentDir}/${image_url}`));
});

router.get('/getAllSubmissionQuestion', (req, res) => {
  const response = [];
  const query = 'SELECT * FROM SUBMISSION_QUESTION, MISSION WHERE MISSION.MISSION_ID = SUBMISSION_QUESTION.MISSION_ID';

  conn.query(query, (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      questions.forEach((question) => {
        response.push({
          id: question.QUESTION_ID, question: question.QUESTION, mission: question.MISSION_ID, title: question.MISSION_TITLE
        });
      });
      res.send(response);
    }
  });
});

router.get('/getAllDrawingQuestion', (req,res) => {
  const response = [];
  const query = 'SELECT * FROM DRAWING_QUESTION, MISSION WHERE MISSION.MISSION_ID = DRAWING_QUESTION.MISSION_ID';

  conn.query(query, (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      questions.forEach((question) => {
        response.push({
          id: question.QUESTION_ID, question: question.QUESTION, mission: question.MISSION_ID, title: question.MISSION_TITLE
        });
      });
      res.send(response);
    }
  });
});

router.get('/getSubmissionQuestionHistory', (req, res) => {
  const trailInstanceID = req.query.trailInstanceID;
  const response = [];
  const getSubmissionMissionQuery = 'SELECT SUMMARY_TABLE.MISSION_ID FROM SUMMARY_TABLE, SUBMISSION_QUESTION_HISTORY WHERE SUMMARY_TABLE.MISSION_ID = SUBMISSION_QUESTION_HISTORY.MISSION_ID AND TRAIL_INSTANCE_ID = ?';
  const query = 'SELECT * FROM SUBMISSION_QUESTION_HISTORY, MISSION_HISTORY WHERE MISSION_HISTORY.MISSION_ID = SUBMISSION_QUESTION_HISTORY.MISSION_ID AND MISSION_HISTORY.MISSION_ID = ?';

  conn.query(getSubmissionMissionQuery, trailInstanceID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let count = 0;
      data.forEach((row) => {
        const mission = row.MISSION_ID;
        conn.query(query, mission, (err, questions) => {
          if (err) {
            console.log(err);
          } else {
            questions.forEach((question) => {
              response.push({
                id: question.QUESTION_ID, question: question.QUESTION, mission: question.MISSION_ID, title: question.MISSION_TITLE
              });
            });
            count += 1;
            if (count === data.length) {
              res.send(response);
            }
          }
        });
      });
    }
  });
});

router.get('/getDrawingQuestionHistory', (req, res) => {
  const trailInstanceID = req.query.trailInstanceID;
  const response = [];
  const getDrawingMissionQuery = 'SELECT SUMMARY_TABLE.MISSION_ID FROM SUMMARY_TABLE, DRAWING_QUESTION_HISTORY WHERE SUMMARY_TABLE.MISSION_ID = DRAWING_QUESTION_HISTORY.MISSION_ID AND TRAIL_INSTANCE_ID = ?';
  const query = 'SELECT * FROM DRAWING_QUESTION_HISTORY, MISSION_HISTORY WHERE MISSION_HISTORY.MISSION_ID = DRAWING_QUESTION_HISTORY.MISSION_ID AND MISSION_HISTORY.MISSION_ID = ?';

  conn.query(getDrawingMissionQuery, trailInstanceID, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let count = 0;
      data.forEach((row) => {
        const mission = row.MISSION_ID;
        conn.query(query, mission, (err, questions) => {
          if (err) {
            console.log(err);
          } else {
            questions.forEach((question) => {
              response.push({
                id: question.QUESTION_ID, question: question.QUESTION, mission: question.MISSION_ID, title: question.MISSION_TITLE
              });
            });
            count += 1;
            if (count === data.length) {
              res.send(response);
            }
          }
        });
      });
    }
  });
});
module.exports = router;
