const express = require('express');
const router = express.Router();
//const Errror = require('err')



router.use((req,res,next)=>{
const error = new Error ('Not found');
error.status(404);
next(error);
})

router.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: "Please check your url "
        }
    })
})
module.exports = router;