'use strict';
(function() {
  angular
    .module('slackOverflowApp')
    .filter('otherUsersFilter', otherUsersFilter);

  otherUsersFilter.$inject = ['store'];

  function otherUsersFilter(store) {
    let currentUser = store.get('profile').userInfo;
    return (participants) => participants.filter(x => x.id !== currentUser.id);
  };

})();