var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/deleteHotspot', function(req,res){
    var hotspotName = req.body.hotspot_name
    
    var query = 'DELETE FROM HOTSPOT WHERE HOTSPOT_NAME = ?'

    conn.query(query, hotspotName, function(err, data){
        if(err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}))
        }else{
            res.send(JSON.stringify({success: "true"}));
        }
    })
})

module.exports = router;

