(function() {
  'use strict';
  angular
    .module('slackOverflowApp')
    .controller('postQuestionController', ['$http', 'store', '$scope', function($http, store, $scope) {

      $scope.submitQuestion = function(title, body) {
        console.log(title, ' ', body, ' ', $scope.fieldId, ' ', store.get('profile').userInfo.id)
        if ($scope.fieldId) {
          // var req = {
          //   method: 'POST',
          //   url: '/questions',
          var data = {
              userId: store.get('profile').userInfo.id,
              title: title,
              text: body,
              fieldId: $scope.fieldId
            }
            // };

          $http.post('/questions', data)
            .then((resp) => {
              console.log('insert error handing or success here', resp)
            })
            .catch((error) => {
              console.log('error posting a question', error);
            });
        } else {
          console.log('select field');
        }
      };

    }]);
})();
