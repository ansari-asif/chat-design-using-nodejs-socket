var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');


app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


var name;

io.on('connection', (socket) => {
  
  socket.on('joining_name', (username) => {
  	name = username;
  	io.emit('chat-message', `---${name} joined the chat---`);
  });
  
  socket.on('disconnect', () => {
    
    io.emit('chat-message', `---${name} left the chat---`);
    
  });
  socket.on('sender_msg', (msg) => {
    socket.broadcast.emit('received_msg', msg);         //sending message to all except the sender
  });
});

server.listen(3000, () => {
  console.log('Server listening on :3000');
});