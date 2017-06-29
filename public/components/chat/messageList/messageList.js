'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .component('messageList', {
      bindings: {
        messages: '<',
        room: '<'
      },
      templateUrl: './public/components/chat/messageList/messageList.html',
      controller: 'MessageListCtrl'
    });

})();
