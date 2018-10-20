var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var databaseConfig = require('../config/mysqlconf.js')

var conn = mysql.createConnection(databaseConfig);

router.get('/loginCheck/', function(req,res){
    console.log(req.query.password);
    conn.query("Select USER_PASSWORD from Participants where USER_NAME=?", req.query.username, function(err, result, fields){
        if (err){
            res.send('username or password is wrong');
        }
        // console.log(result)
        var password = result[0].USER_PASSWORD;
        console.log("pass: " + password);
        if(password === req.query.password){
            res.send('valid');
        }else{
            res.send('username or password is wrong');
        }
    })
})

module.exports=router;