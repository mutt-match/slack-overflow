angular.module('slackOverflowApp').service('QuestionsService', function($http, _) {
  
  var questionsArray = [];

  var service = {
    getAllQuestions: function() {
      return $http.get('/questions', { cache: true }).then(function(resp) {
        questionsArray = resp.data;
      })
        .then(() => {

        })
    },
    
    getQuestion: function(id) {
      function questionMatchesParam(question) {
        return question.id === parseInt(id);
      }
  
      return service.getAllQuestions().then(function (questions) {
        return questions.find(questionMatchesParam)
      });

    }
  }
  
  return service;
})

