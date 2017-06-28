'use strict';
(function() {
  angular
    .module('slackOverflowApp')
    .component('messageForm', messageForm);

  var messageForm = {
    bindings: {
      message: '<'
    },
    templateUrl: './public/components/chat/messageForm.html',
    controller: 'MessageFormCtrl'
  };
)();