const express = require('express');
const router = express.Router();
//const multer = require('multer');
//const fs = require('fs-extra');
//let filepath= './storage/upload';
//const upload = multer({ dest: `${filepath}` });


router.post('/download',(req,res)=>{
    let filename = "89fe767a0bc613ca601e5485867cc95d"//req.body.filename;
    console.log(req.body)
    console.log(req.body.email)
    let user = req.body.email;
    let filepath = `./storage/Profilepicture/${user}/${filename}`;
    
    console.log("filepath",filepath)
    
    res.download(filepath,'cat.png',(err)=>{
       if(err){
        console.log(err)
        res.status(500).json({
            "message":" Fail to Download",
            "success": false
    })
       }
    })
    
    })

    module.exports = router;