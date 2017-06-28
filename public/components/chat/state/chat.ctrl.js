'use strict';
(function() {
  angular
    .module('slackOverflowApp')
    .controller('ChatCtrl', chatCtrl);

  chatCtrl.$inject = ['socket'];

  function chatCtrl(socket) {
    this.toggleLeft = buildToggler('left');
    this.toggleRight = buildToggler('right');

    this.users = chatService.users;
    this.newMessage = undefined;
    this.newMessageBody = undefined;
    this.email = store.get('profile').email;
    this.messages = chatService.messages[this.email];

    this.sendMessage = function() {
      // console.log('THE MESSAGE: ', this.newMessage, ' IS BEING SENT TO: ', this.clickedUser);
      // this.newMessageBody = {email: this.clickedUser, message: this.newMessage}
      // console.log('THIS IS MESSAGE BODY BEING SENT: ', this.newMessageBody);
      // chatService.sendMessage(this.newMessageBody)
      // this.newMessage = '';
    };

    // this.clickedUser;
    this.clickUser = function(user) {
      // console.log('CLICKED USER: ', user);
      // this.clickedUser = user;
      // console.log('this.CLICKEDUSER: ', this.clickedUser);
      // this.toggleLeft();
    };

    $rootScope.$on(this.email, function(event, messageBody) {
      console.log('(chatPage) Receiving Message, messageBody: ', messageBody);
      // this.$apply(function() {
      //   console.log('(chatPage) updating this.messages: ', this.messages);
      //   this.messages = chatService.messages[this.email];
      //   console.log('(chatPage) updated this.messages: ', this.messages)
      // })
    });
    
    $rootScope.$on('updateUsers', function(event, users) {
      console.log('(chatPage) Received userinformation: ', users);
      // this.$apply(function() {
      //   this.users = users;
      // });
    })

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };
  };
)();