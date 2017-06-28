'use strict';
(function() {
  angular
    .module('slackOverflowApp')
    .component('chat', chat);

  var chat = {
    bindings: {},
    templateUrl: './public/components/chat/chat.html',
    controller: 'ChatCtrl'
  };
)();