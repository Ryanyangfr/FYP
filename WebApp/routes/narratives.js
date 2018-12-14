var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getNarratives', function(req,res){
    var query = 'SELECT * FROM NARRATIVE';
    var response = [];

    conn.query(query, function(narratives, err){
        if(err){
            console.log(err)
        } else{
            narratives.forEach(function(narrative){
                var title = narrative.NARRATIVE_TITLE;
                var id = narrative.NARRATIVE_ID;

                response.push({narrative_title: title, narrative_id: id})
            })
            res.send(response)
        }
    })
})

module.exports = router;

