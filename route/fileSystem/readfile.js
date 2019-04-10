const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const mammoth = require('mammoth');
const storepath = '../storage/save';

const sqlcofig = require('../../config/sqlconnection');

//const con = sqlcofig;

router.get('/showtag', (req, res) => {
	console.log(req.query.username)
	let path1 = path.join(__dirname, '../storage/', './save', `./${req.query.username}`) //,'./datascience'
	console.log(path1)
	fs.readdir(path1, (err, items) => {
		// console.log(items);
		res.status(200).json({
			"tags": items

		})
		items.forEach(element => {
			console.log(element);
		});

	})
})

router.get('/showfiles', (req, res) => {
	// console.log(req.body)
	let path1 = path.join(__dirname, '../storage/', './save', `./${req.query.username}`, `./${req.query.tagname}`) //
	console.log(path1)
	fs.readdir(path1, (err, items) => {
		// console.log(items);
		items.forEach(element => {
			console.log(element);
		});
		res.status(200).json({
			"files": items
		})

	})
})


router.get('/asset/:org/:section/:fileName', function (request, response) {
	if (request.params.fileName.split('.')[1] === 'docx') {
		mammoth.convertToHtml({
        // path: `./files/${request.params.fileName}`
        path: path.join(__dirname, '../storage/', './save', `./${request.params.org}`, `./${request.params.section}`, `${request.params.fileName}`)
			})
			.then(function (result) {
				var html = result.value; // The generated HTML
				var messages = result.messages; // Any messages, such as warnings during conversion
				response.send(html);})
			.done();
	} else {
    // var tempFile = `./files/${request.params.fileName}`;
    var tempFile = path.join(__dirname, '../storage/', './save', `./${request.params.org}`, `./${request.params.section}`, `${request.params.fileName}`);
		fs.readFile(tempFile, function (err, data) {
			response.contentType("application/pdf");
			response.send(data);
		});
	}
});

//
router.get('/downloadAsset/:org/:section/:fileName', function(request, response){
  /* var file = path.join(__dirname, '../storage/', './save', `./${request.params.org}`, `./${request.params.section}`, `${request.params.fileName}`)
  response.download(file) */
  var files = request.params.fileName.split(',');
  //console.log(files)
  var fileData;
  var count = 0;
  files.forEach(function(file, key) {
    fileData = path.join(__dirname, '../storage/', './save', `./${request.params.org}`, `./${request.params.section}`, `${file}`);
    response.download(fileData);
    count += 1;
  });
  console.log(count)
});

router.get('/read/:username/:tagname/:filename', (req, res) => {
	console.log(req.params);
	if (req.params) {
		// res.sendFile(path.join(__dirname,'../storage/','./save',`./${req.query.username}`,`./${req.query.tagname}`,`${req.query.filename}`));

		var tempFile = path.join(__dirname, '../storage/', './save', `./${req.params.username}`, `./${req.params.tagname}`, `${req.params.filename}`);
		fs.readFile(tempFile, function (err, data) {
			res.contentType("application/pdf");
			res.send(data);
		});
	} else {
		res.send({
			"message": "notworking"
		})
	}

})

module.exports = router;