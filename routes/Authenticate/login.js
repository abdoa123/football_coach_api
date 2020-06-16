const express = require('express');
const router = express.Router();
const jwt= require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const Sequelize  = require('sequelize');
let saltRounds=10;

var db=require("../../database/db");
var userTable=require("../../database/userTable");

router.post("/login",async function(req,res){

    var users=new userTable();
    const authenticated = await users.searchUser(req.body.email,req.body.password);


    if(authenticated=="not allowed"||authenticated=="wrong"){
         res.json({"token":"Forbidden"});
    } 
    else{
        const newToken=await users.updateToken(authenticated);
        res.json({"token":newToken});
    }

});

module.exports= router;
