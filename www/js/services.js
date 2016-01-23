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

filmeServices.service('sharedProperties', function () {
  var id;

  return {

    setProperty: function(value){
      id = value;
    },
    getProperty: function(){
      return id;
    }
  };
});

        filmeServices.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
