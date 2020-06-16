const express = require('express');
const mysql = require('mysql');

// Create connection
const db2 = mysql.createConnection({
    host     : 'byyhdcmrcoornaoxbmpo-mysql.services.clever-cloud.com',
    user     : 'ujyj8b7d4jqflrci',
    password : 'VJSLGIWMPAx479PV8wQX',
    port : '3306',
    database: 'byyhdcmrcoornaoxbmpo',
   
});


db2.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

module.exports = db2;




