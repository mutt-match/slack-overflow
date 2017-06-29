angular.module('slackOverflowApp')

.service('stackService', ['$http', '$log', function($http, $log) {

  let queryData = [];

  this.getStackAnswers = function(queryData) {
    let queryUrl = 'https://api.stackexchange.com/2.2/questions?order=desc&sort=creation&tagged=powerbi&site=stackoverflow'

    return $http.get(queryUrl)
      .then(resp => {
        queryData = resp.data;
        $log.info('resp', resp);
        $log.info('queryData', queryData);
        return queryData;
      })
      .catch(err => $log.info('errrr during SEQuery', err));


  };

}]);
