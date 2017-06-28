'use strict';
(function() {

  angular
    .module('slackOverflowApp')
    .service('socket', socket);
  
  socket.$inject = ['socketFactory', '$window'];

  function socket(socketFactory, $window) => {
    return socketFactory({
      ioSocket: io.connect($window.location.origin)
    });
  };

})();