require('dotenv').config()

var fs = require('fs'),
configPath = './config/config.json';
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));


 module.exports = {
  storageConfig :  parsed,
     secret: process.env.SECRET  ||'secret',
     salt: process.env.SALT
   };