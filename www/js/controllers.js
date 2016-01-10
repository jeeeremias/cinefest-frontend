  var app = angular.module('cinefestApp.controllers', []);
  var endpoint = 'http://rest-cinefest.rhcloud.com';
//  var endpoint = 'http://localhost:8080';

  app.controller('filmeCtrl', function($scope, $http, $ionicLoading, $cordovaToast, Filmes, Imagem, sharedProperties) {
    console.log('baixando filmes');
    $scope.requestListFilmes = {pag:0, tam:5}
    $scope.lista = [];
    $scope.noMoreItemsAvailable = false;
    $scope.loadMore = function() {
      $http({
        url: endpoint + '/filmes',
        method: "GET",
        params: $scope.requestListFilmes
      }).then(function(result) {
        if (result.data.length == 0) {
          $scope.noMoreItemsAvailable = true;
        }
        for (var i in result.data) {
          $scope.lista.push(result.data[i]);
        }
        console.log($scope.lista);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.requestListFilmes.pag ++;
      }, function(error){
        $cordovaToast.showLongBottom(error.data.error);
      });
    };

    $scope.nome = function (nome, autor, descricao) {
      sharedProperties.addText(nome, autor, descricao);
      console.log(nome, autor, descricao);

    };

    $scope.detalhes = sharedProperties.getNome();
  });

  app.controller('MenuCtrl', function($scope, $http, $state, $q, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, UserService) {
    $scope.go = function(pagina) {
      $state.go(pagina);
    }
  });

  app.controller('LoginCtrl', function($scope, $http, $state, $cordovaDialogs, $q, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, $cordovaToast, UserService) {
    $ionicNavBarDelegate.showBar(false);
    $scope.usuario = JSON.parse(window.localStorage['usuario'] || '{}');
    $scope.submit = function() {
       $http({
        url: endpoint + '/login',
        method: "POST",
        data: $scope.usuario
      }).then(function(success) {
        if (success.data.sucesso) {
          window.localStorage['usuario'] = JSON.stringify($scope.usuario);
          $state.go('menu');
        } else {
          console.log(success.data.mensagem);
          $cordovaToast.showLongBottom(success.data.mensagem);
        }
      }, function(error){
        $cordovaToast.showLongBottom(error.data.error);
      });
    }

    if ($scope.usuario.email != undefined && $scope.usuario.senha != undefined) {
      $scope.submit();
    }

    $scope.goCadastro = function() {
      console.log("fds");
      $state.go('cadastro');
    };

    //This is the success callback from the login method
    var fbLoginSuccess = function(response) {
      if (!response.authResponse){
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
      .then(function(profileInfo) {
        //for the purpose of this example I will store user data on local storage
        UserService.setUser({
          authResponse: authResponse,
  				userID: profileInfo.id,
  				name: profileInfo.name,
  				email: profileInfo.email,
          picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
        });

        $ionicLoading.hide();
        $state.go('lista_filmes');

      }, function(fail){
        //fail get profile info
        console.log('profile info fail', fail);
      });
    };


    //This is the fail callback from the login method
    var fbLoginError = function(error){
      console.log('fbLoginError', error);
      $ionicLoading.hide();
    };

    //this method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
        function (response) {
  				console.log(response);
          info.resolve(response);
        },
        function (response) {
  				console.log(response);
          info.reject(response);
        }
      );
      return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
      console.log('botaosauhsa');
      facebookConnectPlugin.getLoginStatus(function(success){
       if(success.status === 'connected'){
          // the user is logged in and has authenticated your app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed request, and the time the access token
          // and signed request each expire
          console.log('getLoginStatus', success.status);

  				//check if we have our user saved
  				var user = UserService.getUser('facebook');

  				if(!user.userID)
  				{
  					getFacebookProfileInfo(success.authResponse)
  					.then(function(profileInfo) {

  						//for the purpose of this example I will store user data on local storage
  						UserService.setUser({
  							authResponse: success.authResponse,
  							userID: profileInfo.id,
  							name: profileInfo.name,
  							email: profileInfo.email,
  							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
  						});

  						$state.go('menu');

  					}, function(fail){
  						//fail get profile info
  						console.log('profile info fail', fail);
  					});
  				}else{
  					$state.go('menu');
  				}

       } else {
          //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
          //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
          console.log('getLoginStatus', success.status);

  			  $ionicLoading.show({
            template: 'Logging in...'
          });

          //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
          facebookConnectPlugin.login(["public_profile", "email", "user_friends"], fbLoginSuccess, fbLoginError);
        }
      });
    };
  })

  .controller('RegisterCtrl', function($scope, $http, $state, $cordovaToast) {

    $scope.usuario = {};

    $scope.submitCadastro = function() {
      $http({
        url: endpoint + '/cadastro',
        method: "POST",
        data: $scope.usuario
      }).then(function(result) {
        if (result.data.sucesso) {
          console.log(result.data.mensagem);
          $state.go('login');
        } else {
          console.log(result.data.mensagem);
        }
      }, function(error){
        $cordovaToast.showLongBottom(error.data.error);
      });
    }
  })
  .controller('votoCtrl', function($scope, $http){
    $scope.submitForm = function(){
      $scope.submitted = true;
      if ($scope.submitted == true){
        console.log("Clicou no botão confirmar");
      }
    }
  });
    var compareTo = function()
    {
      return {
        require: "ngModel", scope:
        {
          otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel)
      {
        ngModel.$validators.compareTo = function(modelValue)
        {
          return modelValue == scope.otherModelValue;
        };
        scope.$watch("otherModelValue", function()
        {
          ngModel.$validate();
        });
      }
    };
  };
  app.directive("compareTo", compareTo);
