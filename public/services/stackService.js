angular.module('slackOverflowApp')

.service('stackService', ['$http', '$log', function($http, $log) {


  this.getStackAnswers = function() {
    return $http.get('/questions');

  };

}]);
