const express = require('express');

const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.get('/getInstance', (req,res) => {  
  const query = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';

  conn.query(query, (err,instance) => {
    if (err) {
      console.log(err);
    } else{
      const instance_id = instance[0].TRAIL_INSTANCE_ID;
      res.end(JSON.stringify({ trail_instance_id: instance_id }));
    }
  });
});

router.get('/completedHotspots', (req,res) => {
  const instance_id = req.query.trail_instance_id;
  const team_id = req.query.team;
  const response = [];

  const query = 'SELECT HOTSPOT_NAME, ISCOMPLETED FROM TEAM_HOTSPOT_STATUS WHERE TEAM_ID = ? AND TRAIL_INSTANCE_ID = ?';

  conn.query(query, [team_id, instance_id], (err, hotspot_statuses) => {
    hotspot_statuses.forEach((hotspot) => {
      response.push({ hotspot: hotspot.HOTSPOT_NAME, iscompleted: hotspot.ISCOMPLETED });
    });

    res.send(response);
  });
});

router.get('/getAllTrailInstances', (req,res) => {
  const response = [];
  const query = 'SELECT DISTINCT(TRAIL_INSTANCE_ID) FROM TRAIL_INSTANCE';

  conn.query(query, (err,data) => {
    if (err) {
      console.log(err);
      res.send(response);
    } else {
      data.forEach((row) => {
        response.push(row.TRAIL_INSTANCE_ID);
      });
      res.send(response);
    }
  });
});

router.get('/getCurrentTrailInstanceID', (req,res) => {
  const query = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';

  conn.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      if (data.length < 1) {
        res.send({});
        return;
      }
      res.send({ id: data[0].TRAIL_INSTANCE_ID });
    }
  });
});

module.exports = router;