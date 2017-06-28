'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .service('socket', socket);
  
  socket.$inject = ['socketFactory', '$window'];

  function socket(socketFactory, $window) {
    // closure vars
    let participants = [];
    let user = null;
    let messages = [];

    // getters, setters
    this.getParticipants = () => participants;
    this.getUser = () => user;
    this.getMessages = () => messages;
    this.setUser = (newUser) => user = newUser;

    // helpers
    this.changeName = (newName) => user.name = newName; 
    this.addParticipant = (user) => participants.push(user);
    this.newMessage = (msg) => messages.push(msg);

    // attach socket with handlers
    this.socket = init(socketFactory, $window, this);
  };

  function init(socketFactory, $window, service) {
    let host = $window.location.origin;
    console.log("WEBSOCKET connecting to", host);

    let socket = socketFactory({
      ioSocket: io.connect(host)
    });
    
    // listeners
    socket.on('connect', () => {
      console.log('socket', socket);
      let sessionId = socket.id;
      console.log(`WEBSOCKET connected with session id ${sessionId}`);
      socket.emit('add:user', { id: sessionId });

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
      socket.emit('add:message', { message: msg, user: service.getUser() });
    };

    return socket;
  }
  
})();