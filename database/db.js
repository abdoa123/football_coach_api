const express = require('express');
var router = express.Router();
const { Sequelize } = require('sequelize');

sequelize = new Sequelize("byyhdcmrcoornaoxbmpo","ujyj8b7d4jqflrci","VJSLGIWMPAx479PV8wQX", {
    'host' : "byyhdcmrcoornaoxbmpo-mysql.services.clever-cloud.com",
    'dialect' : "mysql",
    'port' : "3306",
    'logging' : false
  })

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;



