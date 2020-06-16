var express = require('express');
var router = express.Router();
var myconnect = require('../database/db2')

router.post('/', function(req, res, next) {
  req = req.body.score;
  req.toString()
  var numberPattern = /\d+/g;
var result = req.match( numberPattern )
let homescore_predict =[];
let awascore_predict=[];
let actuly_home_score=[];
let actuly_away_score=[];
if(result.length>4){
    var j =0;
for (var i =0;i<result.length;){
    homescore_predict[j]=result[i];
    awascore_predict[j]=result[i+1];
    actuly_home_score[j]=result[i+2];
    actuly_away_score[j]=result[i+3]
    i = i+4;
    j++;
    console.log(i);
}
j =0;
}
else{
  homescore_predict =  result[0];
  awascore_predict  = result[1];
  actuly_home_score = result[2];
  actuly_away_score = result[3]
}

console.log(homescore_predict)   
console.log(awascore_predict)   
console.log(actuly_home_score)   
console.log(actuly_away_score)   
res.send({  data:homescore_predict})

  });



module.exports = router;