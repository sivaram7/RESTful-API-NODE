const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
var AdmZip = require("adm-zip");
let zipper = new AdmZip();
var path = require('path');

router.post("/downloadzip", function(req, res) {
    console.log(req.body)
  if (req.body) {
    let arrayName = req.body.file;

    fs.mkdirpSync(`./storage/save/${req.body.org}/down`);

    //selecting particular file
    arrayName.forEach(element => {
      console.log(element);
      let sour = `./storage/save/${req.body.org}/${req.body.tag}/${element}`;
      let des = `./storage/save/${req.body.org}/down/${element}`;
      // console.log('source',sour);
      // console.log('des',des);
      fs.copyFileSync(sour, des);
    });
    //zip the files/folder
    zipper.addLocalFolder(`./storage/save/${req.body.org}/down`);
    zipper.writeZip("./storage/downloads/download.zip", err => {
      if (err) console.log(err);
      else {
        console.log("sucessfully zip");
        var fileData = path.join(__dirname, '../storage/', './downloads/download.zip');
        console.log('rootpath: ' + fileData)
        // res.status(200).download(fileData, err => {
        //   if (err) {
        //     console.log(err);
        //     res.status(500).json({
        //       message: " Fail to Download",
        //       success: false
        //     });
        //   }
        // });
        res.status(200).send({
            file: `http://localhost:4000/downloadZip/${req.body.org}/download.zip`,
        })
      }
    });


  } else {
    res.status(500).send({
      message: "Empty input"
    });
  }
});

router.get("/downloadZip/:org/:fileName", function(req, res) {
    var fileData = path.join(__dirname, '../storage/', './downloads/' + req.params.fileName);
    res.download(fileData);

    //removing the files from the down folder
    let path1 = `./storage/save/${req.params.org}/down`;

    fs.readdir(path1, (err, items) => {
      // console.log(items);
      items.forEach(element => {
        console.log(element);
        fs.unlinkSync(`${path1}/${element}`);a
      });
      fs.unlinkSync("./storage/downloads/download.zip");
    });    
})

module.exports = router;