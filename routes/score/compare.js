var myconnect = require('../../database/db2');
//', correct ='+correct + ', wrong = '+wrong+  
function update_Score(score, correct, wrong, Token) {
var data ;  
  myconnect.query("UPDATE  `user` SET score = "+score+ " , correct = "+correct+ " , wrong = "+wrong + " WHERE token = " + Token, function (err, rows, filds){
    
    if (!err) {
      console.log(rows.affectedRows)
      data=  rows.affectedRows;
    }
    else{
      data= cerr.message ;
    }

})
console.log(data)
return data;
}
module.exports = class score {
  compare(result, score, correct, wrong, Token) {
    var check = 0;
    for (var i = 0; i < result.length;) {
      if((result[i] - result[i + 1] == 0) && (result[i + 2] - result[i + 3] ==0 )){
        score = score + 2;
        check = 1;
      }
      if(((result[i] >  result[i + 1]) && (result[i + 2] > result[i + 3]  )) || ((result[i] <  result[i + 1]) && (result[i + 2] < result[i + 3]))){
        score = score + 3;
        check = 1;
      }
      if ((result[i] == result[i + 2]) && (result[i + 1] == result[i + 3])) {
        score = score + 4;
        check = 1;
       
      }
      if (check==1){
        correct = correct + 1
      }else {
        wrong = wrong + 1
      }
      i = i + 4;
    }
    
    var data =  update_Score(score, correct, wrong, Token);
    console.log(data)
    return data;
  }

}
