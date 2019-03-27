const express = require('express')
const app = express();
const  bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(cors());
app.use(morgan('dev'))

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: false,limit:"50mb"}));

const login= require('./route/users/login');
const signup = require('./route/users/signup');
const dashboard = require('./route/users/dashboard');

const Profilepicture = require('./route/fileSystem/Profilepicture');
const upload = require ('./route/fileSystem/upload');
const showFile = require('./route/fileSystem/readfile');
const uploadmany = require ('./route/fileSystem/upploadmany');
const download = require('./route/fileSystem/download');
const downloadMany=require('./route/fileSystem/downloadmanyzip');
const checkToken = require('./services/authentication');
const error = require('./route/errorHandling/error');



// Login 
app.use(login);

//signup
app.use(signup);

//authentication
//app.use(checkToken)
//dashboard
app.use(dashboard);

//Profilepicture
app.use(Profilepicture);

//upload
app.use(upload);

//uploadmany
app.use(uploadmany);

//read 
app.use(showFile)

//download
app.use(download);

//download
app.use(downloadMany);


//Testing purpose
app.get('/',(req,res)=>{
   console.log("this is api server")
    res.send('Node api server')
});
// handel errors

app.use(error);

//server
const server =app.listen(process.env.LISTEN_PORT,()=>{
  var host = server.address().address
var port = server.address().port

console.log("App listening at http://%s:%s", host, port)   
})