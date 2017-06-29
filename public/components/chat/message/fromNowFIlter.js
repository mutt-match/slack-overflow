'use strict';
(function() {
  angular
    .module('slackOverflowApp')
    .filter('fromNowFilter', fromNow)

  fromNow.$inject = [];

  function fromNow() {
    return (date) => moment(date).fromNow();
  }
})();