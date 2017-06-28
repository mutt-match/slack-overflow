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

io.on('connection', function(socket) {
  console.log('CHAT SERVER CONNECTION SUCCESSFUL');
  socket.on("add:user", function(data) {
    socket.join(data.room);
    var name = data.name || "Guest " + nameCounter++;
    participants.push({ 
      socket: data.socket,
      id:data.id,
      name: name 
    });

    io.sockets.emit("new:user", {
      user: {
        id: data.id,
        name: name,
        socket: data.socket
      },
      sender:"system",
      created_at: new Date().toISOString(),
      participants: participants
    });
  });

  socket.on("join", function(data) {
    console.log(data.room);
    socket.join(data.room);
    io.to(data.room).emit("new:message", {
      user: data.user,
      sender:"system",
      created_at: new Date().toISOString(),
      message: data.message
    });
  });

  socket.on("add:message", function(data) {
    console.log(data);
    io.to(data.room).emit("new:message", {
      user: data.user,
      sender:"system",
      created_at: new Date().toISOString(),
      message: data.message
    });
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
