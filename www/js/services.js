var filmeServices = angular.module('filmeServices', ['ngResource']);

filmeServices.factory('Filmes', ['$resource',
  function($resource){
    return $resource('http://rest-cinefest.rhcloud.com/filmes', {pag:'0', tam:'100'}, {
      'query':  {method:'GET', isArray:true}
    });
  }]);

filmeServices.factory('Imagem', ['$resource',
  function($resource){
    return $resource('http://rest-cinefest.rhcloud.com/imagem', {id:''}, {
      'query':  {method:'GET', isArray:false}
    });
  }]);

  filmeServices.service('sharedProperties', function () {
            var property = [];
            var addText = function(nome, descricao){
              property.splice(0);
              property.push({nome:nome, descricao:descricao});
            };

            var getNome = function(){
              return property;
            };

            return {
              addText: addText,
              getNome: getNome
            };
        });
