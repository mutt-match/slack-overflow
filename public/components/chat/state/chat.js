'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .component('chat', {
        bindings: {
          participants: '<',
          user: '<',
          messages: '<',
          postMessage: '<',
          changeName: '<',
          changeRoom: '<',
          room: '<'
        },
        controller: 'ChatCtrl',
        templateUrl: './public/components/chat/state/chat.html',
    });

})();
