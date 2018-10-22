var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js')

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// checks if user is valid
router.get('/loginCheck/', function(req,res){
    // console.log(req.query.password);
    //implicit connection to database
    //executes query below
    conn.query("Select USER_PASSWORD from Participants where USER_NAME=?", req.query.username, function(err, result, fields){
        if (err){
            //response when there is an error
            res.send('username or password is wrong');
        }
        // console.log(result)
        //getting the password from the database output
        var password = result[0].USER_PASSWORD;
        // console.log("pass: " + password);
        // checks if passwords are the same
        if(password === req.query.password){
            res.send('valid');
        }else{
            res.send('username or password is wrong');
        }
    })
})

//for registration, Accepts post request
router.post('/register', function(req, res){
    //gets parameters from post request
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;

    console.log(req.body);
    console.log(username);
    console.log(name);
    console.log(password);

    var query = "INSERT INTO Participants (NAME,USER_NAME,USER_PASSWORD) VALUES (?,?,?)";
    //updates database
    conn.query(query,[name,username,password], function(err,results){
        if(err){
            console.log(err);
            res.send('failed to update, check parameters');
        } else{
            res.send('updated successfully')
        }
    })
})

router.post('/changePassword', function(req,res){
    var username = req.body.username;
    var newPassword = req.body.newPassword;
    var password = req.body.password;

    var query = 'SELECT USER_PASSWORD FROM Participants WHERE USER_NAME = ?';

    conn.query(query, username, function(err, result, fields){
        if(err || result == undefined){
            console.log(err);
            res.send("Username not found");
            return;
        }

        var currentPassword = result[0].USER_PASSWORD;

        if(currentPassword === password){
            query2 = 'UPDATE Participants SET USER_PASSWORD = ? WHERE USER_NAME = ?';
            conn.query(query2, [newPassword, username], function(err,result_query2){
                if(err){
                    console.log(err);
                    return;
                }
                res.send("Password Updated Successfully");
            })
        }

    })
})

module.exports=router;