const app = require('express')();
const http = require('http');
const net = require('net');
const fs = require('fs');
const path = require('path');

const httpServer = http.Server(app);
const io = require('socket.io')(httpServer);
var port = process.env.PORT || 3000

var rooms = ['1aG5ds'];
const public = io.of('/1aG5ds');

app.use(require('express').static(__dirname + '/public'));


app.get('/connect', function(req, res){
  if (req.query.code && req.query.code.length == 6) {
    res.redirect(req.query.code);
  } else {
    res.redirect('/');
  }
});

app.get('/*', function(req, res, next){
  let room = req.params[0];
  if (room.length == 6 && rooms.includes(room)) {
    res.sendFile(path.join(__dirname, 'room.html'));
  } else next();
});

app.get('*', function(req, res){
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

public.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    public.emit('chat message', msg);
  });
});

httpServer.listen(port, function(){
  console.log('listening on *:' + port);
});
