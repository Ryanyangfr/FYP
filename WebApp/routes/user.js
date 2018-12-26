var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var Pusher = require('pusher')
var crypto = require('crypto');

var databaseConfig = require('../config/mysqlconf.js')

var conn = mysql.createConnection(databaseConfig);

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var pusher = new Pusher({
    appId      : "650737",
    key        : "1721c662be60b9cbd43c",
    secret     : "a14c63eaaa50c1a466ca",
    cluster    : "ap1",
    encrypted  : true
});

var channel = 'events_to_be_shown';

let numUsersEntered = 0;
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
    console.log('User registered');
    conn.query(query, function(err,result){
        var respond_message = [];
        if (err){
            res.send("No participants has joined");
        }

        for(var i=0; i<result.length; i++){
            respond_message.push({username: result[i].USERNAME, team: result[i].TEAM_ID});
        }

        console.log(respond_message);
        res.send(JSON.stringify(respond_message));
    })
})

//for registration, Accepts get request
router.post('/register', function(req, res){
    //gets parameters from post request
    // console.log(req.body);
    var username = req.body.username;
    var user_id = numUsersEntered+1;
    var team_id = numUsersEntered%3 + 1;
    numUsersEntered = numUsersEntered+1;
    var isLeader = 0;
    if(user_id < 3){
        isLeader = 1;
    }
    var event = {
        team_id: team_id,
        id: crypto.randomBytes(16).toString('hex').substring(0,4)
    };
    
    // console.log('request: ' + req);
    // console.log('*****************************************************************')
    // console.log('body: ' + req.body)
    // console.log('*****************************************************************')

    console.log('username: ' + username);
    console.log('user_id: ' + user_id);
    console.log('team: ' + team_id);
    console.log('user entered: ' + numUsersEntered);
    var query = "INSERT INTO PARTICIPANT (USER_ID,USERNAME,TEAM_ID, isLeader) VALUES (?,?,?,?)";
    //updates database
    conn.query(query,[user_id,username,team_id, isLeader], function(err,results){
        if(err){
            console.log(err);
            res.send('failed to update, check parameters');
        } else{
            pusher.trigger(channel, 'created', event);
            res.send(event);
        }
    })
})

router.get('/getPassword', cors(), function(req,res){
    var username = req.query.username;

    query = "SELECT USER_PASSWORD FROM ADMIN WHERE USERNAME = ?";
    
    conn.query(query, username, function(err, row){
        if (err){
            console.log(err);
        }else {
            console.log("password sent");
            res.send({password: row[0].USER_PASSWORD});
        }
    })
})

router.post('/changeAdminPassword', cors(), function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var username = req.body.username;
    var newPassword = req.body.password;

    console.log('sent');
    query = 'UPDATE ADMIN SET USER_PASSWORD = ? WHERE USERNAME = ?';

    conn.query(query, [newPassword, username], function(err, rows){
        if (err){
            console.log(err);
            res.send(JSON.stringify({'status': 'failed'}));
        } else{
            console.log('password updated');
            res.send(JSON.stringify({'status': 'success'}));
        }
    })
})

router.get('/retrieveAllUsers',function(req,res){
    query = 'SELECT USERNAME FROM PARTICIPANT';
    response = []
    console.log('retrieveAllUsers called');

    conn.query(query, function(err, rows){
        if (err){
            console.log(error);
        }
        rows.forEach(function(row){
            response.push(row.USERNAME);
        })

        res.send(JSON.stringify({username: response}));
    })
})

module.exports=router;