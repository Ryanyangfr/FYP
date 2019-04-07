const express = require('express');

const router = express.Router();
const mysql = require('mysql');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.get('/getNarratives', (req,res) => {
  const query = 'SELECT * FROM NARRATIVE';
  const response = [];

  conn.query(query, (err, narratives) => {
    if (err) {
      console.log(err);
    } else {
      narratives.forEach((narrative) => {
        const title = narrative.NARRATIVE_TITLE;
        const id = narrative.NARRATIVE_ID;
        var narrative = narrative.NARRATIVE;

        response.push({narrative_title: title, narrative_id: id, narrative: narrative});
      });
      // console.log(response)
      res.send(JSON.stringify(response, null, 3));
    }
  });
  // res.send({nothing:"nothing"});
});

module.exports = router;
