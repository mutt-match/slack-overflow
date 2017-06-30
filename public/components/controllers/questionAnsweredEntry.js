(function() {
  angular.module('slackOverflowApp')

  .controller('questionAnsweredEntryCtrl', ['$http', '$log', 'stackService', 'QuestionsService', 'store', '$stateParams', 'userService',
      function($http, $log, stackService, QuestionsService, store, $stateParams, userService) {

      var vm = this;
      vm.questionId = $stateParams.id;
      vm.questionAndAnswers;
      vm.notClicked = true;
      vm.repAdded = false;
      vm.currentQuestion = {};

      vm.stackAnswers = [];
      vm.fakeStackAnswers = [{ title: 'Fake Title 1' }, { title: 'Fake Title 2' }, { title: 'Fake Title 3' }]; //save API quota
      vm.fakeMode = true;


      vm.closeQuestion = () => {
        QuestionsService.closeQuestion(vm.questionId)
          .then(() => {
            console.log('successfully closed the question');
          })
          .catch((err) => {
            console.error('error closing question ', err);
          })
      };

      vm.addRep = (userId) => {
        vm.repAdded = true;
        QuestionsService.addRep(userId)
          .then(() => {
            vm.notClicked = false;
            console.log('successfully added reputation');
            userService.getUserInfo(store.get('profile'));
          })
      };

      QuestionsService.getQuestion()
        .then((question) => {
          obj = question.data;
          console.log('obj', obj);
        })
        .then(() => {
          var output = {
            question: [],
            answer: []
          };
          var question = {};
          question.name = obj.results[0].name;
          question.image = obj.results[0].image;
          question.reputation = obj.results[0].reputation;
          question.title = obj.results[0].questions[0].title;
          question.text = obj.results[0].questions[0].text;
          question.status = obj.results[0].questions[0].status;
          output.question.push(question);
          for (var i = 0; i < obj.results[0].questions[0].answers.length; i++) {
            var answer = {};
            answer.userId = obj.results[0].questions[0].answers[i].userId;
            answer.name = obj.results[0].questions[0].answers[i].user.name;
            answer.image = obj.results[0].questions[0].answers[i].user.image;
            answer.reputation = obj.results[0].questions[0].answers[i].user.reputation;
            answer.text = obj.results[0].questions[0].answers[i].text;
            answer.id = obj.results[0].questions[0].answers[i].id;
            output.answer.push(answer);
          }
          vm.questionAndAnswers = output;
          vm.currentQuestion = vm.questionAndAnswers.question[0];
          console.log('question and answers ', vm.questionAndAnswers);
          console.log('vm.currentQuestion ', vm.currentQuestion);
        })
        .catch((err) => {
          console.error('error fetching question and answers ', err);
        });

      vm.postAnswer = function() {
        var body = {
          userId: store.get('profile').userInfo.id,
          text: vm.answerBody
        };

        QuestionsService.postAnswer(body, vm.questionId)
          .then((answer) => {
            console.log('answer: ', answer)
            console.log(vm.questionAndAnswers.answer)
              //get this to auto update ng-repeat
          })
      };

      stackService.getStackAnswers(vm.currentQuestion)
        .then(queryResults => {
          vm.stackAnswers = queryResults.items;
          vm.stackAnswers.length = 5;
          $log.info('vm.stackAnswers', vm.stackAnswers);
          $log.info('question:', vm.questionAndAnswers.question[0].text);
        })
        .catch(err => $log.info(err));



    }])
})();
