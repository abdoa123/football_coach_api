var express = require('express');
var router = express.Router();
var myconnect = require('../database/db2')

//top 10 teams
router.get('/topHome', function(req, res) {
    console.log('Time:', Date.now()  )
    myconnect.query('SELECT HomeTeam, COUNT(*) AS wins FROM `History` WHERE FTHG > FTAG GROUP BY HomeTeam  ORDER BY COUNT(*) DESC LIMIT 10;;',function(err,rows,filds){
      
       if(!err){

        
         if (rows.length > 0) {
          
           return res.send({  data:rows});
       } else {
           return res.send({ error: true, });
               }
       
      }
     
     })
    
   });
//show history of home team
   router.get('/show-history-home', function(req, res) {
    team = req.body.team;
   console.log(team);
    myconnect.query("SELECT SEASON, `Date`, LEFT(MatchDate,11) AS `Date`, HomeTeam, AwayTeam, CONCAT(FTHG, '-', FTAG) AS Result, CONCAT(HTHG, '-', HTAG) AS HalfTime FROM `History` WHERE HomeTeam = "+   "'" + team +  "'" + "ORDER BY `DATE` DESC;",function(err,rows,filds){
      
       if(!err){
        
         if (rows.length > 0) {
          
           return res.send({  res: rows});
       } else {
           return res.send({ error: true, dataL:"No history with this two teams" });
               }
       
      }
     
     })
    
   });
   //show history of away team

   router.get('/show-history-away', function(req, res) {
    team = req.body.team;

    myconnect.query("SELECT SEASON, `Date`, LEFT(MatchDate,11) AS `Date`, HomeTeam, AwayTeam, CONCAT(FTHG, '-', FTAG) AS Result, CONCAT(HTHG, '-', HTAG) AS HalfTime FROM `History` WHERE Awayteam =  "+   "'" + team +  "'" + "ORDER BY `DATE` DESC;",function(err,rows,filds){
      
       if(!err){
        
         if (rows.length > 0) {
          
           return res.send({  res: rows});
       } else {
           return res.send({ error: true, dataL:"No history with this two teams" });
               }
       
      }
     
     })
    
   });
   //select all team
   router.get('/show-history-away', function(req, res) {
   // myconnect.query(

   })

   router.post('/show-history', function(req, res) {
    team1 = req.body.team1;
    team2 = req.body.team2;

    myconnect.query("SELECT SEASON, `Date`, LEFT(MatchDate,11) AS `Date`, HomeTeam, AwayTeam, CONCAT(FTHG, '-', FTAG) AS Result FROM `History` where HomeTeam ="+   "'" + team1 +  "'" + "AND AwayTeam = " + "'"  + team2 + "'"+ "UNION SELECT SEASON, `Date`, LEFT(MatchDate,11) AS `Date`, HomeTeam, AwayTeam, CONCAT(FTHG, '-', FTAG) AS Result FROM `History` where HomeTeam = " + "'"  + team2 + "'" +  "AND AwayTeam =" + "'"  + team1 + "' ORDER BY Season DESC LIMIT 7" ,function(err,rows,filds){
      console.log(team1);
      console.log(team2);

       if(!err){
        
         if (rows.length > 0) {
          
           return res.send({  res: rows});
       } else {
           return res.send({ error: true, dataL:"No history with this two teams" });
               }
       
      }
     
     })
    
   });
   

module.exports = router;
