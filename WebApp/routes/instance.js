var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getInstance', function(req,res){
    query = 'SELECT TRAIL_INSTANCE_ID FROM TRAIL_INSTANCE WHERE ISACTIVE = 1';
    conn.query(query, function(err,instance){
        if (err){
            console.log(err);
        } else{
            var instance_id = instance[0].TRAIL_INSTANCE_ID;
            res.end(JSON.stringify({trail_instance_id: instance_id}));
        }
    })
});