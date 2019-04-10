const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  con = require('../../config/sqlconnection')
const verify = require('../../services/authentication')
const config = require('../../config/config')

router.post('/dashboard',(req,res)=>{
    
//    if(req.body.token){

    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    console.log(token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {

console.log('secret',config.secret)
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
          console.log(err.name,err.message)
        return res.status(403).json({
          success: false,
          message: 'Token is not valid'
        }); 
      } else {
        req.decoded = decoded;
        res.status(200).json({
            success: true,
          message: 'aweeeseomeee its working'
        })
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }


    //console.log(token,req.body.token);

})

module.exports = router;