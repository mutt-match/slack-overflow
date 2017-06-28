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
    let messages = { 'lobby': [] };
    let room = 'lobby';

    // getters, setters
    this.getParticipants = () => participants;
    this.getUser = () => user;
    this.getMessages = () => messages[room];
    this.setUser = (newUser) => user = newUser;
    this.getRoom = () => room;
    this.setRoom = (newRoom) => room = newRoom;

    // helpers
    this.changeName = (newName) => user.name = newName; 
    this.addParticipant = (user) => participants.push(user);
    this.newMessage = (msg) => messages[room].push(msg);

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
      console.log('store', store.get('profile'));
      let sessionId = socket.id;
      let userId = store.get('profile').userInfo.id;
      let name = store.get('profile').name;
      console.log(`WEBSOCKET connected with session id ${sessionId}`);
      socket.emit(
        'add:user', 
        { 
          socket: sessionId,
          id: userId,
          name: name,
          room: service.getRoom() 
        }
      );

      socket.on('new:user', (data) => {
        if (data.user.id === sessionId) service.setUser(data.user);
        service.addParticipant(data.user);
        console.log('new user', service.getUser(), service.getParticipants());
      });
      
      socket.on('new:message', (data) => {
        service.newMessage(data);
      });
    });
    
    // publishers
    service.postMessage = (msg) => {
      // console.log('send message', msg);
      socket.emit('add:message', { message: msg, user: service.getUser(), room: service.getRoom() });
    };

    return socket;
  }
  
})();