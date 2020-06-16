
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Sequelize  = require('sequelize');

var db=require("../../database/db");
var userTable=require("../../database/userTable");


router.get('/logout',async function(req,res){
    var users=new userTable();
   var newToken=await users.signout(req.body.email);

   res.json({"token":newToken});

});


module.exports= router;





