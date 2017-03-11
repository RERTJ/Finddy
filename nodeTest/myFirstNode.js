var express= require('express');
var app = express();

// app.all('/*', function(req, res){
//   res.send('Hello World!');
// });

app.get('/', function(req,res)
{
  console.log('index Get');
  res.send('Get');
})

app.post('/', function(req,res){
  console.log('index Post');
  res.send('Post');
})
app.get('/list_usr', function(req,res){
  console.log('index list');
  res.send('list');
})

var server = app.listen(8081);
