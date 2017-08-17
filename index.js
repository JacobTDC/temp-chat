const app = require('express')();
const http = require('http');
const net = require('net');
const fs = require('fs');
const path = require('path');

const httpServer = http.Server(app);
var port = process.env.PORT || 3000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/connect', function(req, res){
  if (req.query.code && req.query.code.length == 6) {
    res.redirect(req.query.code);
  } else {
    res.redirect('/');
  }
});

app.get('/404', function(req, res){
  res.sendFile(__dirname + '/public/404.html');
});

app.get('/*', function(req, res){
  let loc = req.params[0];
  if (fs.existsSync(path.join('./public', req.path))) {
    res.sendFile(path.join(__dirname, 'public', req.path));
  } else if (loc.length == 6) {
    res.send(loc);
  } else res.redirect('404');
});

httpServer.listen(port, function(){
  console.log('listening on *:' + port);
});