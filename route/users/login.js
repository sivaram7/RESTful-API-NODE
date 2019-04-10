const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  con = require('../../config/sqlconnection')



router.post('/login',(req,res)=>{
            var email = req.body.email;
    
            console.log(email,req.body.password);

            con.query('SELECT * FROM Users WHERE email = ? ', [email], function(error, results, fields) {      
         
                    
                
                    // if(match)
                    // console.log('true')
             if(results=== undefined){
                 console.log("Connection error")
             }
             else{      
                  
                    if (  results.length < 1) {
                    res.status(401).json({
                    "message": "Incorrect Email or Password ",
                    "success": false
                }) }  else{
                    console.log(results)
                    const match =  bcrypt.compareSync(req.body.password,results[0].password)
                    if(match)
                    {
                        const token = jwt.sign(
                            {
                                email:  results[0].email,
                                id: results[0].id

                            },
                            "secret",
                            {
                                    expiresIn: "24h"
                            }
                        );

                        res.status(200).json({
                            "message": "login successful ",
                           "success": true,
                            token: token
                        //    "firstName": results[0].firstName,
                        //    "email": results[0].email,
                        //    "id": results[0].id
                        })

                    }
                    else{
                        console.log('Incorrect password')
                        res.status(401).json({
                                              "message": "Incorrect Password",
                                             "success": false
                                          })

                    }
                }
            }

                       res.end();
            })

        
        })
            
    
    module.exports = router;