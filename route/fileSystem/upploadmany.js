const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs-extra');
let filepath= './storage';
const AdmZip = require('adm-zip');
const upload = multer({ dest: `${filepath}` });
const sqlcofig = require('../../config/sqlconnection');



const con = sqlcofig;


router.post('/upload',upload.array('myFile',1000),(req,res)=>{
  console.log(req.files)

    console.log(req.files)
      if (req.files) {
          
    //     application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip
//            if(MimeType='zip')

          console.log('reqfile',req.files[0].originalname,'filebody',req.body)
  
          let filesCount = req.files.length || 0;
          console.log(filesCount);
      
      // let savingpath= `${filepath}/${req.body.username}/${req.body.tagname}`;
      //console.log(savingpath); 
      for ( i=0;i<filesCount;i++){
      console.log(req.files[i])
      
      let pathTozip = `./storage/save/${req.body.username}/${req.body.tagname}/`;

      if(req.files[i].mimetype == "application/zip" || req.files[i].mimetype == "application/octet-stream" || req.files[i].mimetype == "application/x-zip-compressed" || req.files[i].mimetype == "multipart/x-zip" )
       {console.log("yes i am a zip file") 
          
          var zip = new AdmZip(`./storage/${req.files[i].filename}`);
          console.log(zip)
          zip.extractAllTo(/*target path*/`${pathTozip}`, /*overwrite*/true);
          fs.unlinkSync(`./storage/${req.files[i].filename}`);
          console.log('zip file removed')
       }
      else{
      //rename file
      fs.renameSync(`./storage/${req.files[i].filename}`, `./storage/${req.files[i].originalname}`, function (err) {
        if (err) throw err;
        console.log('renamed complete');
      });
      
      // to check file already existing 
      let pathToSave = `./storage/save/${req.body.username}/${req.body.tagname}/${req.files[i].originalname}`;
      if(fs.existsSync(pathToSave)){
          console.log('yes file exist')
          fs.unlinkSync(pathToSave);
          console.log('file removed')
      }
      

      // moving files to user/tagname
      fs.moveSync(`./storage/${req.files[i].originalname}`,`./storage/save/${req.body.username}/${req.body.tagname}/${req.files[i].originalname}`, {mkdirp: true},(err)=>{
        if(err)  console.log("Internal error")
        
      })
      }
  }
  
  //     let dbFile = `./storage/save/${req.body.username}/${req.body.tagname}/`;
  //    //  let db1= dbFile.replace(/\\/g,"&#92;");
  //     console.log(dbFile);
  //     const date = new Date();
  //     let users={
  //       "username":  req.body.username,
  //       "tagname": req.body.tagname,
  //       "filepath": dbFile,
  //       "createdAt": date,
  //       "updatedAt": date
  
  //     }
  
      // con.query('INSERT INTO demousers SET ?',users,(err,result)=>{
      //   if (err) {
      //     console.log("error ocurred",err);
      //     res.status(500).json({
      //       "message":"File uploded path issue",
      //       "success":false
      //     })
      //   }
        res.status(200).json({
          "message": "File uploaded successfully",
          "success": true
  })
  //    })
  
             
        
       }
             else {
              console.log('No File Uploaded');
              res.status(501).json({
                  "message":" Fail to upload",
                  "success": false
          })
      }
  })

module.exports = router;