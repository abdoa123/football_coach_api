const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Sequelize  = require('sequelize');

var userTable=require("../../database/userTable");

app=express();
app.use(bodyParser);

router.get('/scores',async function(req, res){
    console.log("rank");
    var tkn = req.headers['token'];
    var users=new userTable();
    const usr= await users.getUsertkn(tkn);

    if(usr=="Not Authorsized"){
        res.json({"token":"Forbidden"});
   }
   else
   {
    var ranked=[];
    const allusrs=await users.getUserRanks();
    for(var i=0;i<allusrs.length;++i){
        var jsonObj={
                    "email":allusrs[i]["email"],
                    "firstname":allusrs[i]["firstname"],
                     "lastname":allusrs[i]["lastname"],
                     "correct":allusrs[i]["correct"],
                     "wrong":allusrs[i]["wrong"],
                     "score":allusrs[i]["score"],
                    }
        ranked.push(jsonObj);
    }
    res.json(ranked);
   }

});

module.exports= router;