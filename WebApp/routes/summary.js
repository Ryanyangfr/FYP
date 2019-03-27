const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.get('/getSummaryReport', (req,res) => {
  const response = [];
  const query ='SELECT * FROM SUMMARY_TABLE';
  const getDateQuery = 'SELECT DATE_STARTED FROM TRAIL_INSTANCE WHERE TRAIL_INSTANCE_ID = ?';
  let count = 0;

  conn.query(query, (err,data) => {
    if (err) {
      console.log(err);
    } else {
      data.forEach((row) => {
        let trailInstanceID = row.TRAIL_INSTANCE_ID;
        let hotspot = row.HOTSPOT_NAME;
        conn.query(getDateQuery, trailInstanceID, (err,data2) => {
          if (err) {
            console.log(err)
          } else {
            let date = data2[0].DATE_STARTED;
            response.push({trailInstanceID, hotspot, date});
          }
        })
      })
    }
  })
})
module.exports = router;