const sql = require('mysql');

const mysql = sql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
  });
mysql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
  module.exports = mysql;
 
// dont delete
// const config= require('./config')  
// console.log(process.env.db_config)
// console.log(config.storageConfig.development)
//const mysql = sql.createConnection(config.storageConfig.development)
//------------/use this configuration if it works/--------------
// const mysql = sql.createConnection(process.env.db_config || config.storageConfig.development)