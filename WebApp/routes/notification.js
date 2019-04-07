const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/sendNotification', (req,res) => {
  const io = req.app.get('socketio');
  const message = req.body.message;

  io.emit('notification', { message });
  if (message.length > 0) {
    res.send(JSON.stringify({ success: 'true' }));
  } else {
    res.send(JSON.stringify({ success: 'false' }));
  }
});

module.exports = router;
