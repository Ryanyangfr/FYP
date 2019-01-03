var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


router.post('/addHotspot', function(req,res){
    console.log(req.body)
    var hotspotName = req.body.hotspot_name;
    var latitude = req.body.latitude;
    var longtitude = req.body.longtitude;
    var narrative_id = req.body.narrative_id;

    var query = 'INSERT INTO HOTSPOT VALUES (?,?,?,?)';

    conn.query(query,[hotspotName,latitude,longtitude,narrative_id], function(err, query){
        if(err){
            console.log(err);
            res.send(JSON.stringify({success: "false"}))
        }else{
            res.send(JSON.stringify({success: "true"}));
        }
    })
})

router.post('/addNarrative', function(req,res){
    console.log(req.body);
    var narrative = req.body.narrative;
    var title = req.body.title;

    var getNumNarrative = 'SELECT COUNT(*) as count from NARRATIVE';

    conn.query(getNumNarrative, function(err, data){
        var count = data.count;
        var id = count + 1;

        var query = 'INSERT INTO NARRATIVE VALUES (?,?,?)';

        conn.query(query, [id, title, narrative], function(err, reply){
            if(err){
                console.log(err);
                res.send(JSON.stringify({success: "false"}))
            }else{
                res.send(JSON.stringify({success: "true"}));
            }
        })
    })
})
module.exports=router;


