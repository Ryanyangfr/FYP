var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js');

var conn = mysql.createConnection(databaseConfig);

router.get('/getNarratives', function(req,res){
    var query = 'SELECT * FROM NARRATIVE'
})

module.exports = router;

