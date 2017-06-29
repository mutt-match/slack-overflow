(function() {
  angular.module('slackOverflowApp')

  .service('stackService', ['$http', '$log', function($http, $log) {

    this.getAnswers = (data) => {
      console.log('###', data);

    }

  }])
})();
