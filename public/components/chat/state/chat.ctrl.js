(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('ChatCtrl', chatCtrl);

  chatCtrl.$inject = [];

  function chatCtrl() {
    this.joinLobby = () => {
      this.changeRoom('Lobby');
    };
  };
})();