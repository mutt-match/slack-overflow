'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .component('message', {
      bindings: {
        message: '<'
      },
      templateUrl: './public/components/chat/message/message.html',
      controller: 'MessageCtrl'
    });

})();
