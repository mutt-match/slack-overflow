'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .component('messageList', {
      bindings: {
        messages: '<'
      },
      templateUrl: './public/components/chat/messageList/messageList.html',
      controller: 'MessageListCtrl'
    });

})();
