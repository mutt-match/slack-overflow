angular.module('slackOverflowApp')

.service('stackService', ['$http', '$log', function($http, $log) {


  this.getStackAnswers = function() {

    return $http.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=creation&tagged=powerbi&site=stackoverflow')
      .then(data => $log.info('data', data))
      .catch(err => $log.info('errrrr', err));

  };

}]);
