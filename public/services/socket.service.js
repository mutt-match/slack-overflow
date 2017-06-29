'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .service('socket', socket);
  
  socket.$inject = ['socketFactory', '$window', 'store'];

  function socket(socketFactory, $window, store) {

    // closure vars
    let participants = [];
    let user = null;
    let messages = { 'Lobby': [] };
    let room = 'Lobby';

    // getters, setters
    this.getParticipants = () => participants;
    this.getUser = () => user;
    this.getMessages = () => messages[room];
    this.setUser = (newUser) => user = newUser;
    this.getRoom = () => room;
    this.setRoom = (newRoom) => {
      room = newRoom;
      messages[room] = messages[room] || [];
    };

    // helpers
    this.changeName = (newName) => user.name = newName; 
    this.addParticipant = (user) => participants.push(user);
    this.removeParticipant = (socket) => {
      participants.forEach((user, idx) => {
        if (user.socket === socket) {
          participants.splice(idx, 1);
        }
      })
    };
    this.newMessage = (msg) => messages[room].push(msg);
    this.resetRoomMessages = (newMessages) => {
      messages[room].splice(0);
      newMessages.forEach(this.newMessage);
    }

    // attach socket with handlers
    this.socket = init(socketFactory, $window, store, this);
  };

  function init(socketFactory, $window, store, service) {
    let host = $window.location.origin;
    console.log("WEBSOCKET connecting to", host);

    let socket = socketFactory({
      ioSocket: io.connect(host)
    });
    
    // listeners
    socket.on('connect', () => {

      let userId = store.get('profile').userInfo.id;
      let name = store.get('profile').name;
      service.changeRoom(service.getRoom());
      console.log(`WEBSOCKET connected with session id ${socket.id}`);
      socket.emit(
        'add:user', 
        { 
          id: userId,
          name: name,
          room: service.getRoom() 
        }
      );

      socket.on('new:user', (data) => {
        if (data.user.id === userId) {
          service.setUser(data.user);
          data.participants.forEach(service.addParticipant);
        } else {
          console.log('addd new user not initial', data);
          service.addParticipant(data.user);
        }
        console.log('new user', service.getUser(), service.getParticipants());
      });
      
      socket.on('new:message', (data) => {
        if (data.roomMessages) {
          service.resetRoomMessages(data.roomMessages);
        } else service.newMessage(data);
      });

      socket.on('disconnect:user', (data) => {
        service.removeParticipant(data.socket);
      })
    });
    
    // publishers
    service.postMessage = (msg) => {
      console.log('send message', service.getUser());
      socket.emit('add:message', { message: msg, user: service.getUser(), room: service.getRoom() });
    };

    service.changeRoom = (newId) => {
      if (newId === 'Lobby') room = 'Lobby';
      else {
        var currentUserId = store.get('profile').userInfo.id;
        var room = [newId, currentUserId].sort().join('');
      }
      service.setRoom(room);
      socket.emit('join', { user: service.getUser(), room: room })
    };

    return socket;
  }
  
})();