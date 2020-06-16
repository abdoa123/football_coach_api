const express = require('express');
const router = express.Router();
const jwt= require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const Sequelize  = require('sequelize');

var db=require("../../database/db");
var user=require("../../models/User");
var userTable=require("../../database/userTable");
let saltRounds=10;

app=express();
app.use(bodyParser);


router.post('/signup',async function(req, res) {

    user["firstname"] = req.body.firstname;
    user["lastname"] = req.body.lastname;
    user["email"] =req.body.email;

    //create Token
    await jwt.sign({user:user},'secretkey',(err,token)=>{
        user["token"]=token;
        });

    //hash Password
     hash=await bcrypt.hash(req.body.password,saltRounds);
     user["password"]=hash;
     var users=new userTable();
     var flag=await users.checkExist(user["email"]);
     if(flag=="allow"){
          users.addUser(user["firstname"],user["lastname"],user["token"],user["password"],user["email"]);
          res.json({"token":user["token"]});
        }
    else{
           res.json({"token":"Forbidden"});
        }
});

module.exports = router;
