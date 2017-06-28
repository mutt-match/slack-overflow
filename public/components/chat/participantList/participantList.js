'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .component('participantList', {
      bindings: {
        participants: '<'
      },
      templateUrl: './public/components/chat/participantList/participantList.html',
      controller: 'ParticipantListCtrl'
    });

})();
