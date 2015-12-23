  var app = angular.module('starter.controllers', [])

  app.controller('movieCtrl', function($scope, $http, $ionicLoading, Filmes, Imagem, sharedProperties) {
    console.log('baixando filmes');
    $scope.requestListFilmes = {pag:0, tam:3}
    $scope.lista = [];
    $scope.noMoreItemsAvailable = false;
    $scope.loadMore = function() {
      $http({
        url: 'http://rest-cinefest.rhcloud.com/filmes',
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
      });
    };

    $scope.nome = function (nome, autor, descricao) {
      sharedProperties.addText(nome, autor, descricao);
      console.log(nome, autor, descricao);

    };

    $scope.detalhes = sharedProperties.getNome();
  });

  app.controller('LoginCtrl', function($scope, $http, $state, $q, $ionicLoading, $ionicPopup, UserService) {

    $scope.data = {};

    $scope.submit = function(){
      $state.go('app.lista_filmes'); //Método que redireciona o usuario para a pagina de lista de filmes
      /*
      console.log("user: " + $scope.data.username + " - PW: " + $scope.data.password);
        var link = 'http://nikola-breznjak.com/_testings/ionicPHP/api.php';

        $http.post(link, {username : $scope.data.username}).then(function (res){
            $scope.response = res.data;
            console.log("response:" +$scope.response);
            alert("response: "  +$scope.response);
            if ($scope.response){//Verificar a resposta do service

            }else {

            }

        });

        */

    }

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
        $state.go('app.lista_filmes');

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

  						$state.go('app.home');

  					}, function(fail){
  						//fail get profile info
  						console.log('profile info fail', fail);
  					});
  				}else{
  					$state.go('app.home');
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

  .controller('RegisterCtrl', function($scope, $http) {
      $scope.data = {};

      $scope.submit = function(){
        console.log("user: " + $scope.data.username + " - PW: " + $scope.data.password);
          var link = 'http://nikola-breznjak.com/_testings/ionicPHP/api.php';

          $http.post(link, {username : $scope.data.username}).then(function (res){
              $scope.response = res.data;
              console.log("response:" +$scope.response);
              alert("response: "  +$scope.response);
          });
        };
  })
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
