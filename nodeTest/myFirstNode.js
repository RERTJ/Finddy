var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var fs = require("fs")//for upload file
var multer  = require('multer');//for upload file

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/index.html', function(req,res)
{
  res.sendFile(__dirname + '/' + "index.html");
})

// app.get('/process_get', function (req, res) {
//   response = {
//       first_name:req.query.first_name,
//       last_name:req.query.last_name
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// })
// post try

app.post('/process_post', urlencodedParser, function (req, res) {
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

//file upload
app.get('/uploadFile.html', function(req,res)
{
  res.sendFile(__dirname + '/' + "uploadFile.html");
})

app.post('/file_upload',function(req,res){
  console.log(req.files[0]);
  var des_file=__dirname + '/' + req.files[0].originalname;
  fs.readFile(req.files[0].path, function (err, data){
    fs.writeFile(des_file, data, function (err){
      if(err){
        console.log(err);
      }
        else{
          response={
            message:'File uploaded!',
            filename: req.files[0].originalname
          };
        }
        console.log(response);
        res.end(JSON.stringify(response));

    })
  })
})

var server = app.listen(8081);
