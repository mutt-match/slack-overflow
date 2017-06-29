(function() {
  'use strict';
  angular.module('slackOverflowApp')

  .controller('toolbarController', ['$log', 'stackService', 'auth', 'store', '$location', 'authService', 'userService', 'QuestionsService', 'chatService',
       function($log, stackService, auth, store, $location, authService, userService, QuestionsService, chatService) {

      let vm = this;
      vm.redirectHome = redirectHome;
      vm.login = login;
      vm.logout = logout;
      vm.auth = auth;
      vm.stackAuth = stackAuth;
      // vm.registerUser = authService.registerUser;


      function redirectHome() {
        if (store.get('profile')) {
          userService.getUserInfo(store.get('profile'));
        }
        $location.path('/home1');
      }

      function login() {
        auth.signin({}, function(profile, token) {
          store.set('profile', profile);
          store.set('id_token', token);
          $location.path('/home1');
          authService.registerUser(profile);
          // userService.getUserInfo(profile);
          console.log('this is profile upon login', store.get('profile'));
          vm.stackAuth();
        }, function(error) {
          console.log('login error', error);
        });
      };

      function logout() {
        chatService.exitChatServer(store.get('profile').email);
        store.remove('profile');
        store.remove('id_token');
        auth.signout();
        $location.path('/home');
      };

      function stackAuth() {
        $log.info('This is SE', SE);

        SE.authenticate({
          success: function(data) {
            $log.info('$$$', data);
            alert(
              'User Authorized with account id = ' +
              data.networkUsers[0].account_id + ', got access token = ' +
              data.accessToken
            );
          },
          error: function(data) {
            $log.info('vvv', data);
            alert('An error occurred:\n' + data.errorName + '\n' + data.errorMessage);
          },
          networkUsers: true
        });

      };

    }])

  .directive('toolbar', function() {
    return {
      controller: 'toolbarController',
      controllerAs: 'toolbarCtrl',
      bindToController: true,
      templateUrl: '/public/components/templates/toolbar.html'
    }
  });

})();
