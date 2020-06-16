var express = require('express');
var router = express.Router();
var myconnect = require('../../database/db2')
var new_data = require('./compare.js')
var update = new new_data;
router.post('/', function (req, res, next) {
  resultt = req.body.score;
  Token = req.body.user;
  var numberPattern = /\d+/g;
  var result = resultt.match(numberPattern)
  var score, wrong, correct;
  myconnect.query('SELECT * from `user` WHERE token =' + Token, function (err, rows, filds) {

    if (!err) {

      if (rows.length > 0) {
        var data =update.compare(result, rows[0].score, rows[0].wrong, rows[0].correct, Token)
        console.log(data);
        res.send({data: "one row affect" })
      } else {
        res.send({ data: "errsda" })
      }

    }

  })
});



module.exports = router;