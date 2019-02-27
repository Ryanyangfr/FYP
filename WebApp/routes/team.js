const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const router = express.Router();
const databaseConfig = require('../config/mysqlconf.js');
const utility = require('../utility.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const conn = mysql.createConnection(databaseConfig);

router.get('/getAllTeams', (req, res) => {
  const trail_instance_id = req.query.trail_instance_id;
  const query = 'SELECT * FROM TEAM WHERE TRAIL_INSTANCE_ID = ?';
  const response = [];

  conn.query(query, trail_instance_id, (err, teams) => {
    teams.forEach((team) => {
      response.push({
        team_id: team.TEAM_ID, points: team.TEAM_POINTS, latitude: team.LATITUDE, longtitude: team.LONGTITUDE
      });
    });
    console.log(response);
    res.send(response);
  });

});

router.get('/getAllTeamsInCurrentActiveTrail', (req, res) => {
  // const trail_instance_id = req.query.trail_instance_id;

  const getActiveTrailQuery = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';
  const response = [];
  conn.query(getActiveTrailQuery, (err, trails) => {
    if (err) {
      console.log(err);
    } else {
      const query = 'SELECT * FROM TEAM WHERE TRAIL_INSTANCE_ID = ?';
    
      conn.query(query, trails[0].TRAIL_INSTANCE_ID, (err, teams) => {
        if (err) {
          console.log(err);
        } else {
          teams.forEach((team) => {
            response.push({
              team_id: team.TEAM_ID, points: team.TEAM_POINTS, latitude: team.LATITUDE, longtitude: team.LONGTITUDE
            });
          });
          console.log(response);
          res.send(response);
        }
      });
    }
  });
});

router.post('/updateScore', (req, res) => {
  const team_id = req.body.team_id;
  const instance_id = req.body.trail_instance_id;
  const update = parseInt(req.body.score);
  const hotspot = req.body.hotspot;
  const io = req.app.get('socketio');
  const time = utility.getDateTime();

  // const today = new Date();
  // // console.log(`timezone offset: ${today.getTimezoneOffset()}`);
  // today.setTime(today.getTime() + today.getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
  // const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

  // let minutes = today.getMinutes();
  // if (minutes < 10) {
  //   minutes = `0${minutes}`;
  // }

  // let seconds = today.getSeconds();
  // if (seconds < 10) {
  //   seconds = `0${seconds}`;
  // }

  // let hours = today.getHours();
  // if (hours < 10) {
  //   hours = `0${hours}`;
  // }

  // const time = `${hours}:${minutes}:${seconds}`;
  // const dateTime = `${date} ${time}`;
  console.log(`timestamp: ${time}`);
  // console.log('time: ' + time);
  console.log(`team_id: ${team_id}`);
  console.log(`instance_id: ${instance_id}`);
  console.log(`score: ${update}`);
  console.log(`hotspot: ${hotspot}`);

  const query = 'SELECT TEAM_POINTS FROM TEAM WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

  conn.query(query, [team_id, instance_id], (err, team) => {
    if (err) {
      console.log(err);
    } else {
      const points = team[0].TEAM_POINTS + update;
      console.log(`points: ${points}`);
      const queryUpdate = 'UPDATE TEAM SET TEAM_POINTS = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';
      const queryUpdate_hotspot = 'UPDATE TEAM_HOTSPOT_STATUS SET ISCOMPLETED = 1, TIME_COMPLETED = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ? AND HOTSPOT_NAME = ?';

      conn.query(queryUpdate_hotspot, [time, team_id, instance_id, hotspot], (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log('updated hotspot status');
          io.emit('test', { test: 'test update hotspot status' });
        }
      });
      conn.query(queryUpdate, [points, team_id, instance_id], (err, data) => {
        if (err) {
          console.log(err);
        } else {
          io.emit('activityFeed', { time: time, team: team_id, hotspot: hotspot });
          res.send('update successful');
        }
      });
    }
  });
});

router.get('/startingHotspot', (req, res) => {
  const instance_id = req.query.trail_instance_id;
  const query = 'SELECT TH.HOTSPOT_NAME, LATITUDE, LONGTITUDE, N.NARRATIVE FROM TRAIL_HOTSPOT AS TH, HOTSPOT AS H, NARRATIVE AS N WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND H.HOTSPOT_NAME = TH.HOTSPOT_NAME AND TH.NARRATIVE_ID = N.NARRATIVE_ID';
  const response = [];
  const io = req.app.get('socketio');
  console.log('instance id: ' + instance_id);

  conn.query(query, instance_id, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(row)
      // console.log(row[0]);
      // console.log(row[0]);
      conn.query('SELECT COUNT(*) as COUNT FROM TEAM WHERE TRAIL_INSTANCE_ID = ?', instance_id, (err, row_count) => {
        const numTeams = row_count[0].COUNT;
        console.log(numTeams);
        for (let i = 0; i < numTeams; i++) {
          console.log('row: ');
          console.log(row[i]);
          response.push({ team: i + 1, startingHotspot: row[i].HOTSPOT_NAME, coordinates: [row[i].LATITUDE, row[i].LONGTITUDE], narrative: row[i].NARRATIVE });
        }
        console.log('response: ');
        console.log(response);
        io.emit('test', { test: 'test starting hotspot' });
        res.send(response);
      });
    }
  });
});

router.get('/hotspotStatus', (req, res) => {
  const instance_id = req.query.trail_instance_id;
  const response = [];
  const io = req.app.get('socketio');

  const query = 'SELECT TEAM.TEAM_ID, COUNT(ISCOMPLETED) AS COUNT FROM TEAM LEFT OUTER JOIN TEAM_HOTSPOT_STATUS ON TEAM.TRAIL_INSTANCE_ID = TEAM_HOTSPOT_STATUS.TRAIL_INSTANCE_ID AND TEAM.TEAM_ID = TEAM_HOTSPOT_STATUS.TEAM_ID AND ISCOMPLETED=1 WHERE TEAM.TRAIL_INSTANCE_ID = ? GROUP BY TEAM_ID ORDER BY COUNT DESC';

  console.log(`instance id: ${instance_id}`);
  conn.query(query, instance_id, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      rows.forEach((row) => {
        response.push({ team: row.TEAM_ID, hotspots_completed: row.COUNT });
      });
      io.emit('test', { test: 'test hotspot status' });
      res.send(JSON.stringify(response, null, 3));
    }
  });
});

router.get('/getAllTeamsWithMembers', (req, res) => {
  // const instanceID = req.query.trail_instance_id;
  const response = [];
  const query = 'SELECT * FROM PARTICIPANT ORDER BY TEAM_ID';

  conn.query(query, (err, rows) => {
    let teamID = 1;
    let temp = [];
    rows.forEach((team) => {
      if (team.TEAM_ID === teamID) {
        temp.push({ team_id: team.TEAM_ID, username: team.USERNAME, user_id: team.USER_ID });
      } else {
        response.push(temp);
        temp = [];
        temp.push({ team_id: team.TEAM_ID, username: team.USERNAME, user_id: team.USER_ID });
        teamID = team.TEAM_ID;
      }
    });
    response.push(temp);
    res.send(response);
  });
});

router.post('/teamLocation', (req,res) => {
  console.log('location update');
  console.log(req.body);
  const io = req.app.get('socketio');
  const teamID = req.body.teamID;
  const long = req.body.long;
  const lat = req.body.lat;

  const locationQuery = 'UPDATE TEAM SET LONGTITUDE = ?, LATITUDE = ? WHERE TEAM_ID = ?';

  conn.query(locationQuery, [long,lat,teamID], (err,data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: 'false' }));
    } else {
      io.emit('updateLocation', { teamID: teamID, long: long, lat: lat });
      res.send(JSON.stringify({ success: 'true' }));
    }
  });
});

router.get('/getAllTeamPoints', (req,res) => {
  // get current trail instance
  let instanceID = req.query.trail_instance_id;
  const getActiveTrailInstance = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';

  conn.query(getActiveTrailInstance, (err, data) => {
    if (err) {
      console.log(`get active trail instance error: ${err}`);
    } else {
      console.log(data[0]);
      let activeTrailInstanceID = 0;

      if (data.length > 0) {
        activeTrailInstanceID = data[0].TRAIL_INSTANCE_ID;
      }

      if (instanceID !== undefined) {
        activeTrailInstanceID = instanceID;
      }

      if (activeTrailInstanceID === 0) {
        res.send([]);
        return;
      }
      console.log(instanceID);
      console.log(`instance id : ${activeTrailInstanceID}`)
      const response = [];
      //query to get team points and number of completed hotspots
      const teamPointsQuery = 'SELECT TEAM.TEAM_ID, TEAM.TEAM_POINTS, COUNT(ISCOMPLETED) AS COUNT FROM TEAM LEFT OUTER JOIN TEAM_HOTSPOT_STATUS ON TEAM.TRAIL_INSTANCE_ID = TEAM_HOTSPOT_STATUS.TRAIL_INSTANCE_ID AND TEAM.TEAM_ID = TEAM_HOTSPOT_STATUS.TEAM_ID AND ISCOMPLETED = 1 WHERE TEAM.TRAIL_INSTANCE_ID = ? GROUP BY TEAM_ID ORDER BY COUNT DESC';
  
      conn.query(teamPointsQuery, activeTrailInstanceID, (err, teams) => {
        if (err) {
          console.log(err);
          res.send(response);
        } else {
          console.log('Team data: ');
          console.log(teams);
  
          teams.forEach((team) => {
            response.push({ team: team.TEAM_ID, points: team.TEAM_POINTS, hotspots_completed: team.COUNT });
          });
  
          res.send(response);
        }
      });
    }
  });
});

router.get('/activityFeed', (req,res) => {
  let response = []
  const getActiveTrailInstance = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';

  conn.query(getActiveTrailInstance, (err, data) => {
    if (err) {
      console.log(`get active trail instance error retrieve activity feed: ${err}`);
      res.send(response);
    } else {
      const activityFeedQuery = 'SELECT * FROM TEAM_HOTSPOT_STATUS WHERE ISCOMPLETED = 1 AND TRAIL_INSTANCE_ID = ? ORDER BY TIME_COMPLETED DESC';
      //{ time: time, team: team_id, hotspot: hotspot }
      conn.query(activityFeedQuery, data[0].TRAIL_INSTANCE_ID, (err, data2) => {
        if (err) {
          console.log(err)
          res.send(response);
        } else {
          data2.forEach((row) => {
            response.push({ time:row.TIME_COMPLETED, team: row.TEAM_ID, hotspot: row.HOTSPOT_NAME });
          });
          res.send(response);
        }
      });
    }
  });
});

router.post('/updateScoreAdmin', (req,res) => {
  const team = req.body.team;
  const addedPoints = parseInt(req.body.points);

  const getActiveTrailInstance = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';
  const getCurrentTeamScore = 'SELECT TEAM_POINTS FROM TEAM WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';
  const updateTeamScoreQuery = 'UPDATE TEAM SET TEAM_POINTS = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

  conn.query(getActiveTrailInstance, (err, data) => {
    if (err) {
      console.log(`get active trail instance error retrieve update score admin: ${err}`);
      res.send(JSON.stringify({ success: 'false' }))
    } else {
      const trailInstanceID = data[0].TRAIL_INSTANCE_ID
      conn.query(getCurrentTeamScore, [team, trailInstanceID], (err,data2) => {
        if (err) {
          console.log(`get current team score: ${err}`);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          let currTeamPoints = parseInt(data2[0].TEAM_POINTS);
          currTeamPoints += addedPoints;
          conn.query(updateTeamScoreQuery, [currTeamPoints, team, trailInstanceID], (err, data3) => {
            if (err) {
              console.log(`update current team score: ${err}`);
              res.send(JSON.stringify({ success: 'false' }));
            } else {
              res.send(JSON.stringify({ success: 'true' }));
            }
          })
        }
      })
    }
  });
});

router.post('/updateScoreSubmission', (req,res) => {
  const team = req.body.team;
  const submissionID = req.body.submissionID;
  const addedPoints = parseInt(req.body.points);
  let status;

  if (addedPoints > 0) {
    status = 'Approved';
  } else {
    status = 'Rejected';
  }

  const getActiveTrailInstance = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';
  const getCurrentTeamScore = 'SELECT TEAM_POINTS FROM TEAM WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';
  const updateTeamScoreQuery = 'UPDATE TEAM SET TEAM_POINTS = ? WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';
  const updateSubmissionStatus = 'UPDATE SUBMISSION SET SUBMISSION_STATUS = ? WHERE SUBMISSION_ID = ?';

  conn.query(getActiveTrailInstance, (err, data) => {
    if (err) {
      console.log(`get active trail instance error retrieve update score admin: ${err}`);
      res.send(JSON.stringify({ success: 'false' }))
    } else {
      const trailInstanceID = data[0].TRAIL_INSTANCE_ID
      console.log(`trail instance id: ${trailInstanceID}`);
      conn.query(getCurrentTeamScore, [team, trailInstanceID], (err,data2) => {
        if (err) {
          console.log(`get current team score: ${err}`);
          res.send(JSON.stringify({ success: 'false' }));
        } else {
          console.log(data2);
          let currTeamPoints = parseInt(data2[0].TEAM_POINTS);
          currTeamPoints += addedPoints;
          conn.query(updateTeamScoreQuery, [currTeamPoints, team, trailInstanceID], (err, data3) => {
            if (err) {
              console.log(`update current team score: ${err}`);
              res.send(JSON.stringify({ success: 'false' }));
            } else {
              conn.query(updateSubmissionStatus, [status, submissionID], (err, data4) => {
                if (err) {
                  console.log(`update current submission status: ${err}`);
                  res.send(JSON.stringify({ success: 'false' }));
                } else {
                  res.send(JSON.stringify({ success: 'true' }));
                }
              })
            }
          })
        }
      })
    }
  });
});

module.exports = router;