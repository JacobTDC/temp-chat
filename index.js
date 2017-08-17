const app = require('express')();
const http = require('http');
const httpServer = http.Server(app);

const net = require('net');
const stream = require('stream');

var port = process.env.PORT || 3000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/connect', function(req, res){
  if (req.query.code && req.query.code.length == 6) {
    res.redirect(req.query.code);
  } else {
    res.redirect('/');
  }
});

app.get('/404', function(req, res){
  res.sendFile(__dirname + '/404.html');
});

app.get('/*', function(req, res){
  let loc = req.params[0];
  if (loc.length == 6) {
    res.send(loc);
  } else {
    res.redirect('404');
  }
});

httpServer.listen(port, function(){
  console.log('listening on *:' + port);
});