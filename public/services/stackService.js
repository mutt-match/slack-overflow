angular.module('slackOverflowApp')

.service('stackService', ['$http', '$log', function($http, $log) {

  let queryData = [];

  let urlParts = {
    base: 'https://api.stackexchange.com',
    tags: ['angular', 'stupid'],
    titles: [],
    version: '2.2',
    method: 'search', //question, answer, etc
    order: 'desc',
    sort: 'creation', //creation, activity
    site: 'stackoverflow',
  };

  this.makeQueryUrl = function(p) {
    let url = `${p.base}/${p.version}/${p.method}?order=${p.order}&sort=${p.sort}`;
    if (p.tags.length) { url += '&tagged=' + p.tags.join('&') };
    if (p.titles.length) { url += '&intitle=' + p.titles.join('&') };
    url += '&site=' + p.site
    return url;
  }

  this.exampleUrls = [
    `https://api.stackexchange.com/2.2/questions?order=desc&sort=creation&tagged=powerbi&site=stackoverflow`,

    `https://api.stackexchange.com/2.2/
      search/advanced?order=desc&sort=activity&tagged=mongo&node&site=stackoverflow`
  ];


  this.getStackAnswers = function(queryData) {
    let queryUrl = this.makeQueryUrl(urlParts);
    $log.info(queryUrl)
    return $http.get(queryUrl)
      .then(resp => {
        queryData = resp.data;
        $log.info('queryData', queryData);
        return queryData;
      })
      .catch(err => $log.info('errrr during SEQuery', err));


  };

}]);
