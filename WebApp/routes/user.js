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
        var respond_message = [];
        if (err){
            res.end("No participants has joined");
        }

        for(var i=0; i<result.length; i++){
            respond_message.push({username: result[i].USERNAME})
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
    var user_id = req.body.user_id;
    var team_id = req.body.team_id;

    // console.log(username);
    // console.log(user_id);
    // console.log(team_id);
    var query = "INSERT INTO PARTICIPANT (USER_ID,USERNAME,TEAM_ID) VALUES (?,?,?)";
    //updates database
    conn.query(query,[user_id,username,team_id], function(err,results){
        if(err){
            console.log(err);
            res.send('failed to update, check parameters');
        } else{
            res.send('updated successfully')
        }
    })
})

module.exports=router;