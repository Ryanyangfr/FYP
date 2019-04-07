const express = require('express');

const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.get('/getHotspots', (req,res) => {
  const query = 'SELECT HOTSPOT.HOTSPOT_NAME, LONGTITUDE, LATITUDE FROM HOTSPOT';
  const response = [];

  conn.query(query, (err, hotspots) => {
    if (err) {
      console.log(err);
    } else {
      hotspots.forEach((hotspot) => {
        const hspot = hotspot.HOTSPOT_NAME;
        const lat = hotspot.LATITUDE;
        const long = hotspot.LONGTITUDE;

        response.push({hotspot_name: hspot, latitude: lat, longtitude: long});
      });
      res.send(JSON.stringify(response, null, 3));
    }
  });
});

module.exports = router;
