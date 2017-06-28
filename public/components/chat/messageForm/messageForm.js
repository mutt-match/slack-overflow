'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .component('messageForm', {
      bindings: {
        message: '<',
        onSubmit: '<'
      },
      templateUrl: './public/components/chat/messageForm/messageForm.html',
      controller: 'MessageFormCtrl'
    });

})();
