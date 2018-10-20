var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var databaseConfig = require('../config/mysqlconf.js')

var connection = mysql.createConnection(databaseConfig);

router.get('/loginCheck', function(req,res){

})