const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const databaseConfig = require('../config/mysqlconf.js');

const router = express.Router();

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let trailID = 0;

conn.query('SELECT COUNT(*) AS COUNT FROM TRAIL', (err, num) => {
  if (err) {
    console.log(err);
  } else {
    trailID = num[0].COUNT;
  }
});

router.post('/addTrail', (req,res) => {
  trailID += 1;
  const totalTime = req.body.totalTime;
  const numTeams = req.body.numTeams;
  const hotspots = req.body.hotspot;
  const missions = req.body.missions;

  const trailCreationQuery = 'INSERT INTO TRAIL VALUES (?,?,?)';

  conn.query(trailCreationQuery, [trailID, totalTime, numTeams], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const trailHotspotsCreationQuery = 'INSERT INTO TRAIL_HOTSPOT VALUES (?,?)';
      
      hotspots.forEach((hotspot) => {
        conn.query(trailHotspotsCreationQuery, [trailID,hotspot.name], (err, result) => {
          if (err) {
            res.send(JSON.stringify({ success: 'false' }));
            console.log(err);
          } else {
            res.send(JSON.stringify({ success: 'true' }));
          }
        });
      });

      const trailMissionsCreationQuery = 'INSERT INTO TRAIL_MISSION VALUES (?,?)';

      missions.forEach((mission) => {
        conn.query(trailMissionsCreationQuery, [trailID, mission.id], (err, result) => {
          if (err) {
            res.send(JSON.stringify({ success: 'false' }));
            console.log(err);
          } else {
            res.send(JSON.stringify({ success: 'true' }));
          }
        })
      });
    }
  })
});

module.exports = router;
