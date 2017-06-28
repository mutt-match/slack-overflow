'use strict';
(function() {
  angular
    .module('slackOverflowApp')
    .component('messageList', messageList);

  var messageList = {
    bindings: {
      messages: '<'
    },
    templateUrl: './public/components/chat/messageList.html',
    controller: 'MessageListCtrl'
  };
)();