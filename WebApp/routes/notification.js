const express = require('express');

const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const databaseConfig = require('../config/mysqlconf.js');

const conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let id = 1;
const idQuery = 'SELECT MAX(ID) as MAX FROM ACTIVITY_FEED';

conn.query(idQuery, (err,data) => {
  if (err) {
    console.log(err);
  } else if (data[0].MAX !== undefined) {
    id = data[0].MAX;
  }
})

router.post('/sendNotification', (req,res) => {
  const io = req.app.get('socketio');
  const message = req.body.message;
  console.log(message)
  const addActivityFeedQuery = 'INSERT INTO ACTIVITY_FEED VALUES (?,?)';

  conn.query(addActivityFeedQuery, [id,message], (err,data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('added activity feed');
      id += 1;
    }
  })
  io.emit('notification', {message:message});
  if (message.length > 0) {
    res.send(JSON.stringify({ success: 'true' }));
  } else {
    res.send(JSON.stringify({ success: 'false' }));
  }
});

module.exports = router;
