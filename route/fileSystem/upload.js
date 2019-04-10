const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs-extra');
let filepath= './storage/upload';
const upload = multer({ dest: `${filepath}` });



router.post('/uploadsingle',upload.single('myFile'),(req,res)=>{

    if (req.file) {
        console.log("email",req.body.email)

        console.log('Uploading file...',req.file,"====",req.file.filename,"mime===",req.file.mimetype);
        
        if(req.file){
        //if(req.file.mimetype =="application/pdf"||req.file.mimetype == "image/png" || req.file.mimetype == "image/gif") {     
            let savingpath= `${filepath}/${req.body.email}/`;
            console.log(savingpath)


           
             fs.move(`./storage/Profilepicture/${req.file.filename}`,`./storage/Profilepicture/${req.body.email}/${req.file.filename}`, {mkdirp: true},(err)=>{
               if(err)  console.log("Internal error")
             })

            


            res.status(200).json({
                "message": "File uploaded successfully",
                "success": true
        })
    }   else{
            console.log("file format not match");
            try {
                fs.unlinkSync(`./storage/Profilepicture/${req.file.filename}`)
                console.log("file removed")
              } catch(err) {
                console.error(err)
              }
            res.status(415).json({
                "message":" File Format not match",
                "success": false
        })
    }  

    } else {
            console.log('No File Uploaded');
             res.status(501).json({
                "message":" Fail to upload",
                "success": false
        })
    }
})

module.exports = router;