var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var databaseConfig = require('../config/mysqlconf.js');

// var multipartMiddleware = multipart();

var conn = mysql.createConnection(databaseConfig);
var submissionDir = './images/submission';

console.log("test");

router.post('/uploadSubmission', multipart({ uploadDir: submissionDir}), function(req,res){
    // console.log(req.files);
    fs.readFile(req.files.image.path, function(err,data){
        // console.log(req.files.image.path);
        if(req.files){
            res.status(200).send("Uploaded!!!");
        }

        image_path = req.files.image.path
        new_image_path = image_path.substring(
                            0,image_path.lastIndexOf('\\')+1)
                            + req.files.image.name;
            // console.log(req.files);
            // console.log(image_path);
            // console.log(image_path.lastIndexOf('\\')+1);
            // console.log(req.files.image.name);
        fs.rename(image_path, image_path.substring(0,image_path.lastIndexOf('\\')+1) + req.files.image.name, function(err){
            console.log(err);
        });
    })
})

// router.get('getAllSubmissions', function(req,res){
//     var 
// })
module.exports = router;
