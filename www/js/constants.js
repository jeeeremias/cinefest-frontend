var app = angular.module('cinefestApp');

app.constant('CONSTANTS', {
  'URL_LIST_MOVIES': 'http://rest-cinefest.rhcloud.com/filmes',
  'URL_DETAIL_MOVIE': 'http://rest-cinefest.rhcloud.com/filme',
  'URL_IMAGE': 'http://rest-cinefest.rhcloud.com/imagem?resource=',
  'URL_LIST_MOVIES_LOCAL': 'http://localhost:8080/filmes',
  'URL_DETAIL_MOVIE_LOCAL': 'http://localhost:8080/filme',
  'URL_IMAGE_LOCAL': 'http://localhost:8080/imagem?resource='
});
