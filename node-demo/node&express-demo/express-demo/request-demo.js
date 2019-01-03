var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/index',function(req,res){
  res.type('html');
  res.sendFile(__dirname+'/public/index.html');
});

var greet = express.Router();
greet.post('/jp',function(req,res){
  res.type('text-plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body,null,2));
});

app.use(['/gre+t','/hel{2}o'],greet);

app.use('/greet',greet);

app.use(express.static(__dirname+'/public'));


app.listen(port,function(err){
  console.log('express server is listening on port '+port);
});