'use strict';
(function() {
  angular
    .module('slackOverflowApp')
    .component('message', message);

  var message = {
    bindings: {
      message: '<'
    },
    templateUrl: './public/components/chat/message.html',
    controller: 'MessageCtrl'
  }
)();