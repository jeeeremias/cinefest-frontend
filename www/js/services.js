var filmeServices = angular.module('filmeServices', ['ngResource']);

filmeServices.factory('Filmes', ['$resource',
  function($resource){
    return $resource('http://rest-cinefest.rhcloud.com/filmes', {pag:'@pag', tam:'@tam'}, {
      'query':  {
        method:'GET',
        isArray:true,
        transformResponse: function(data) {
          return angular.fromJson(data);
        }
      }
    });
  }]);

filmeServices.factory('Imagem', ['$resource',
  function($resource){
    return $resource('http://rest-cinefest.rhcloud.com/imagem', {id:''}, {
      'query':  {method:'GET', isArray:false}
    });
  }]);
