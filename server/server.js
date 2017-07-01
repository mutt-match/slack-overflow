const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const router = require('./routes');
const db = require('./db');
const init = require('./init');

const port = process.env.PORT || 3456;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', router);

app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../node_modules')));

let messages = { 'Lobby': [] };
var participants = [];
var nameCounter = 1;

io.on('connection', function(socket) {

  var room = null;

  console.log(`socket connected at ${socket.id}`);

  socket.on("add:user", function(data) {
    var name = data.name || "Guest " + nameCounter++;
    userId = data.id;

    participants.push({
      socket: socket.id,
      id: data.id,
      name: name
    });

    io.sockets.emit("new:user", {
      user: {
        id: data.id,
        name: name,
        socket: socket.id
      },
      sender: "system",
      created_at: new Date().toISOString(),
      participants: participants
    });
  });

  socket.on("join", (data) => {
    messages[data.room] = messages[data.room] || [];
    let newMessage = {
      user: data.user,
      sender: "system",
      created_at: new Date().toISOString(),
      message: "joined room",
      room: data.room,
      roomMessages: messages[data.room],
    };
    socket.join(data.room);
    io.to(data.room).emit("new:message", newMessage);
  });

  socket.on("add:message", (data) => {
    let newMessage = {
      user: data.user,
      sender: "system",
      created_at: new Date().toISOString(),
      message: data.message,
      room: data.room
    };
    messages[data.room].push(newMessage);
    io.to(data.room).emit("new:message", newMessage);
  });

  socket.on("disconnect", () => {
    participants.forEach((user, idx) => {
      if (user.socket === socket.id) {
        participants.splice(idx, 1);
      }
    });
    io.sockets.emit('disconnect:user', { socket: socket.id });
  });

  socket.on("disconnect", () => {
    participants.forEach((user, idx)=> {
      if (user.socket === socket.id) {
        participants.splice(idx, 1);
      }
    });
    io.sockets.emit('disconnect:user', { socket: socket.id });
  });
  
});

init()
  .then(() => server.listen(port, () => console.log(`app is listening at http://localhost:${port}`)))
  .catch(err => console.error('unable to connect to database ', err));
