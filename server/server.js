const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const router = require('./routes');
const db = require('./db');
const init = require('./init');

const port = 3456;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', router);

app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../node_modules')));

const users = {};

// io.on('connection', function(socket){
//   socket.on('say to someone', function(id, msg){
//     socket.broadcast.to(id).emit('my message', msg);
//   });
// });
var participants = [];
var nameCounter  = 1;
// var disconnected = {};

io.on('connection', function(socket) {

  var room = null;

  console.log(`socket connected at ${socket}`);

  socket.on("add:user", function(data) {
    var name = data.name || "Guest " + nameCounter++;
    userId = data.id;
    console.log('adding new user', data);
    // if (!data.socket) return;

    console.log('add participants before', participants);
    
    participants.push({ 
      socket: socket.id,
      id: data.id,
      name: name 
    });

    console.log('add participants after', participants);

    socket.join(data.room);

    io.sockets.emit("new:user", {
      user: {
        id: data.id,
        name: name,
        socket: socket.id
      },
      sender:"system",
      created_at: new Date().toISOString(),
      participants: participants
    });
  });

  socket.on("join", (data) => {
    socket.join(data.room);
    io.to(data.room).emit("new:message", {
      user: data.user,
      sender:"system",
      created_at: new Date().toISOString(),
      message: "joined room"
    });
  });

  socket.on("add:message", (data) => {
    console.log(data);
    io.to(data.room).emit("new:message", {
      user: data.user,
      sender:"system",
      created_at: new Date().toISOString(),
      message: data.message
    });
  });

  socket.on("disconnect", () => {
    // disconnected[socket.id] = true;
    console.log('socket id', socket.id)
    console.log('disconnect participants before', participants);
    participants.forEach((user, idx)=> {
      if (user.socket === socket.id) {
        participants.splice(idx, 1);
      }
    });
    console.log('disconnect participants after', participants);
    io.sockets.emit('disconnect:user', { socket: socket.id });
  });
  
  // socket.on('join', function(email, callback) {
  //   console.log('USER JOINED, email: ', email);
  //   socket.email = email;
  //   users[socket.email] = socket;
  //   console.log('socket.email: ', socket.email);
  //   console.log('CURRENT USER LIST, users: ', users);
  //   updateUsers();
  // });


  // socket.on('exitChatServer', function(email, callback) {
  //   console.log('THIS IS EXIT, EMAIL : ', email);
  //   delete users[email];
  //   console.log('DELETE USERS', Object.keys(users));
  //   updateUsers();
  // });

  // socket.on('add:message', function(messageBody, callback) {
  //   var sendTo = messageBody.email;
  //   var message = messageBody.message;
  //   messageBody.from = socket.email
  //   console.log('SEND TO: ', sendTo, ' MESSAGE: ', message, ' FROM: ', socket.email);
  //   console.log('MESSAGE BODY', messageBody);
  //   io.emit(sendTo, messageBody);
  //   io.emit(messageBody.from, messageBody);
  //   // socket.emit(sendTo, message);
  // });

  // function updateUsers() {
  //   console.log('UPDATING USER LIST: ', Object.keys(users));
  //   io.sockets.emit('users', Object.keys(users));
  // }

});

init()
  .then(() => server.listen(port, () => console.log(`app is listening at http://localhost:${port}`)))
  .catch(err => console.error('unable to connect to database ', err));
