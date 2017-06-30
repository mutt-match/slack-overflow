(function() {
  angular
    .module('slackOverflowApp')
    .controller('questionsAnsweredListCtrl', ['stackService', '$log', 'QuestionsService', 'store', function(stackService, $log, QuestionsService, store) {
      var vm = this;
      vm.questionsList = [];
      vm.userId = store.get('profile').userInfo.id;
      vm.profile = store.get('profile');
      // vm.fieldArray = store.get('profile').userInfo.fields;

      QuestionsService.getQuestionsForUser(vm.userId)
        .then((resp) => {
          answersObj = resp.data;
          $log.log('Questions:', resp.data.results[0].questions);
        })
        .then(() => {
          var name = answersObj.results[0].name;
          for (var i = 0; i < answersObj.results[0].questions.length; i++) {
            var question = {};
            question.name = name;
            question.id = answersObj.results[0].questions[i].id;
            question.title = answersObj.results[0].questions[i].title;
            question.text = answersObj.results[0].questions[i].text;
            question.field = answersObj.results[0].questions[i].field.name;
            vm.questionsList.push(question);
          }
        })
        .catch(err => $log.error('error fetching questions for user ', err));



    }])
})();
