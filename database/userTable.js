const Sequelize  = require('sequelize');
var db=require("../database/db")
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');

class UserTable{

    constructor(){
        const User = db.define('user', {
            firstname: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            lastname: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false
              },
              token: {
                type: Sequelize.TEXT
              },
			        photo: {
                type: Sequelize.STRING
              },
			        score: {
                type: Sequelize.INTEGER            
              },
			        correct: {
                type: Sequelize.INTEGER            
              },
			        wrong: {
                type: Sequelize.INTEGER            
              }
          });
    }

     addUser(firstname,lastname,token,password,email) {
        db.query(
            `INSERT INTO user (firstname, lastname,password,token,email) VALUES('${firstname}','${lastname}','${password}','${token}','${email}')`,{
            type: Sequelize.QueryTypes.INSERT
          }
        ).then(function (data) {

          console.log('inserted STEAMER data---> ', data); });
      };

      async searchUser(email,password) {
         let data= await db.query ( `SELECT * FROM user WHERE email='${email}'`,{
            type: Sequelize.QueryTypes.SELECT
          }
        )
          if(data.length<=0)
           {
             return "wrong";
          }
          let res = await  bcrypt.compare(password,data[0]["password"]);
            if(res){
              console.log('password correct');
              return data[0];
          }else{
              console.log("not correct");
              return "not allowed";
          }
      };

      async checkExist(email){

        let data= await db.query ( `SELECT * FROM user WHERE email='${email}'`,{
          type: Sequelize.QueryTypes.SELECT
        }
      )

      if(data.length>0){
        return "not allow";
    }else{
        console.log("correct");
        return "allow";
    } 
      }

      async updateToken(user){
        //create new token
        user["token"]=await jwt.sign({user:user},'secretkey');

        let data= await db.query ( `UPDATE user SET token='${user["token"]}' WHERE email='${user["email"]}'`,{
          type: Sequelize.QueryTypes.UPDATE
        }
      )
    
      return user["token"];
      }

      async signout(email){
        let data= await db.query ( `UPDATE user SET token='${null}' WHERE email='${email}'`,{
          type: Sequelize.QueryTypes.UPDATE
        }
      )
      return null;
      }

      async getUsertkn(token){
        let data= await db.query ( `SELECT * FROM user WHERE token='${token}'`,{
          type: Sequelize.QueryTypes.SELECT
        }
      )
        if(data.length<=0)
         {
           return "Not Authorsized";
        }
        else{
          return data[0];
        }
      }

      async photoUsertkn(token,url){
        let data= await db.query ( `UPDATE user SET photo='${url}' WHERE token='${token}'`,{
          type: Sequelize.QueryTypes.UPDATE
        }
      )
      }
	  
	  async getUserRanks(){
        let data= await db.query ( `SELECT * FROM user ORDER BY score DESC`,{
          type: Sequelize.QueryTypes.SELECT
        }
      )
        if(data.length<=0)
         {
           return "Not Authorsized";
        }
        else{
          return data;
        }
      }

};


  module.exports= UserTable;
