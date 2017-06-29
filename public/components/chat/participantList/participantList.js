'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .component('participantList', {
      bindings: {
        participants: '<',
        changeRoom: '<',
        joinLobby: '<'
      },
      templateUrl: './public/components/chat/participantList/participantList.html',
      controller: 'ParticipantListCtrl'
    });

})();
