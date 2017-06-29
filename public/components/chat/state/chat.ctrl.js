(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('ChatCtrl', chatCtrl);

  chatCtrl.$inject = ['socket', 'store'];

  function chatCtrl(socket, store) {
    // this.toggleLeft = buildToggler('left');
    // this.toggleRight = buildToggler('right');

    this.joinLobby = () => {
      this.changeRoom('lobby');
    };

    // this.email = store.get('profile').email;

    // function buildToggler(componentId) {
    //   return function() {
    //     $mdSidenav(componentId).toggle();
    //   };
    // };
  };
})();