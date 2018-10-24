var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var databaseConfig = require('../config/mysqlconf.js')

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// checks if user is valid
// router.get('/loginCheck/', function(req,res){
//     // console.log(req.query.password);
//     //implicit connection to database
//     //executes query below
//     conn.query("Select USER_PASSWORD from Participants where USER_NAME=?", req.query.username, function(err, result, fields){
//         if (err){
//             //response when there is an error
//             res.send('username or password is wrong');
//         }`
//         // console.log(result)
//         //getting the password from the database output
//         var password = result[0].USER_PASSWORD;
//         // console.log("pass: " + password);
//         // checks if passwords are the same
//         if(password === req.query.password){
//             res.send('valid');
//         }else{
//             res.send('username or password is wrong');
//         }
//     })
// })

//for getting all users
router.get('/retrieveAllUser', function(req,res){
    var query = "SELECT * FROM PARTICIPANT";

    conn.query(query, function(err,result){
        if (err){
            res.end("No participants has joined");
        }

        res.send(result);
    })
})

//for registration, Accepts get request
router.get('/register', function(req, res){
    //gets parameters from post request
    var username = req.query.username;
    var user_id = req.query.user_id;
    var trail_id = req.query.trail_id;

    var query = "INSERT INTO PARTICIPANT (USERNAME,USER_ID,TRAIL_ID) VALUES (?,?,?)";
    //updates database
    conn.query(query,[username,user_id,trail_id], function(err,results){
        if(err){
            console.log(err);
            res.send('failed to update, check parameters');
        } else{
            res.send('updated successfully')
        }
    })
})

module.exports=router;