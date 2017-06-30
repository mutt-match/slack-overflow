angular.module('slackOverflowApp')

.service('stackService', ['QuestionsService', '$http', '$log', function(QuestionsService, $http, $log) {

  let vm = this;

  let queryData = [];

  let urlParts = {
    base: 'https://api.stackexchange.com',
    tags: ['mongoose'],
    titles: [],
    version: '2.2',
    method: 'search', //question, answer, etc
    order: 'desc',
    sort: 'creation', //creation, activity
    site: 'stackoverflow',
  };

  let exampleUrls = [
    `https://api.stackexchange.com/2.2/questions?order=desc&sort=creation&tagged=powerbi&site=stackoverflow`,
    `https://api.stackexchange.com/2.2/
      search/advanced?order=desc&sort=activity&tagged=mongo&node&site=stackoverflow`
  ];

  let parseCurrentQuestion = function(question) {
    if (typeof question === 'Object') {
      $log.info('question!!!', question);
      let arr = question.data.results[0].questions[0].text.split('');
      $log.info('arr!!!', arr);
      return arr;
    }
  };

  let makeTags = function() {
    return QuestionsService.getQuestion()
      .then(question => {
        $log.info('question#', question);
        let tags = parseCurrentQuestion(question);
        $log.info('tags#', urlParts.tags);
        urlParts.tags = tags;
        return tags;
      })
      .catch(err => $log.log('err with QuestionsService', err));
  };

  let makeQueryUrl = function(p) {
    let url = `${p.base}/${p.version}/${p.method}?order=${p.order}&sort=${p.sort}`;
    if (p.tags.length) { url += '&tagged=' + p.tags.join('&') };
    if (p.titles.length) { url += '&intitle=' + p.titles.join('&') };
    url += '&site=' + p.site
    return url;
  }



  this.getStackAnswers = function() {
    let queryUrl = makeQueryUrl(urlParts);
    let tags = makeTags();
    return $http.get(queryUrl)
      .then(resp => {
        queryData = resp.data;
        $log.info('queryData', queryData);
        $log.info('tags$', urlParts.tags);
        $log.info(queryUrl)
        return queryData;
      })


  };

}]);
