  var app = angular.module('cinefestApp.controllers', []);
  var endpoint = 'http://rest-cinefest.rhcloud.com';
//  var endpoint = 'http://localhost:8080';

  app.controller ('barCtrl', function($scope, $ionicHistory){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
  });
  app.controller ('programacaoCtrl', function($scope, $ionicHistory){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
  });
  app.controller('filmeCtrl', function($scope, $http, $ionicLoading, $cordovaToast, Filmes, Imagem, sharedProperties, $state) {
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

    $scope.nome = function (idFilme) {
      sharedProperties.setProperty(idFilme);
      console.log('id passado' + idFilme);
      $state.go('detalhe_filme');
    };
    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  });

  app.controller('detalhesCtrl', function($scope, $http, sharedProperties){
    $scope.id = {id:sharedProperties.getProperty()};
    $http({
      url: endpoint + '/filme',
      method: "GET",
      params: $scope.id
    }).then(function(result){
      console.log(result.data);
    }, function(error){
      console.log('erro' + error.data.error);
    });
  });
  app.controller('MenuCtrl', function($scope, $http, $state, $q, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, UserService) {
    $scope.go = function(pagina) {
      $state.go(pagina);
    }
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
          $cordovaToast.showLongBottom(result.data.mensagem);
        }
      }, function(error){
        $cordovaToast.showLongBottom(error.data.error);
      });
    }
  })
  .controller('votoCtrl', function($scope, $http){
    $scope.lista = [];
    $scope.requestListFilmes = {pag:0, tam:10}
    $http({
      url: endpoint + '/filmes',
      method: 'GET',
      params: $scope.requestListFilmes
    }).then(function(result){
      console.log(result.data);
      $scope.lista = result.data;
    }), function(error){
      console.log('erro' + error.data.error);
    }

    $scope.voto = {};
    $scope.submitForm = function(){
      $scope.submitted = true;
      if ($scope.submitted == true){
        console.log("Clicou no botão confirmar");
      }
    }
  })
    .controller('cardapioCtrl', function($scope){

      $scope.lanches = new getLanches().lanches;
      $scope.massas = new getMassas().massas;
      $scope.doces = new getDoces().doces;
      $scope.empadas = new getEmpadas().empadas;
      $scope.tapiocas = new getTapiocas().tapiocas;
    })
  .controller('progracaoCtrl', function($scope){
    $scope.programacao = new getProgramacao().primeiroDia;

    $scope.dia = 15;
    $scope.desabilitar = true;

    $scope.proximo = function(){
      $scope.dia ++;
      if ($scope.dia == 15){
        $scope.desabilitar = true;
      }
    };
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
