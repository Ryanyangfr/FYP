const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.get('/getAllHotspots', (req, res) => {
  const trail_instance_id = req.query.trail_instance_id;
  const query = 'SELECT NARRATIVE.NARRATIVE, HOTSPOT.HOTSPOT_NAME, LATITUDE, LONGTITUDE FROM TRAIL_HOTSPOT, HOTSPOT, NARRATIVE WHERE TRAIL_ID = (SELECT TRAIL_ID FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?) AND TRAIL_HOTSPOT.HOTSPOT_NAME = HOTSPOT.HOTSPOT_NAME AND TRAIL_HOTSPOT.NARRATIVE_ID = NARRATIVE.NARRATIVE_ID';

  conn.query(query, trail_instance_id, (err, result) => {
    if (err) {
      console.log('query 1 error: ' + err);
    } else {
      const response = [];
      result.forEach((element) => {
        const hotspot_name = element.HOTSPOT_NAME.trim();
        const lat = element.LATITUDE;
        const long = element.LONGTITUDE;
        const narrative_value = element.NARRATIVE;

        response.push({
          coordinates: [lat, long],
          name: hotspot_name,
          narrative: narrative_value,
        });
      });

      res.end(JSON.stringify(response, null, 4));
    }
  });
});

module.exports = router;
