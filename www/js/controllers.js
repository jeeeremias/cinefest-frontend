  var app = angular.module('cinefestApp.controllers', []);
  var endpoint = 'http://rest-cinefest.rhcloud.com';
//  var endpoint = 'http://localhost:8080';

  app.controller ('barCtrl', function($scope, $ionicHistory){
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
      console.log(pagina);
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
    .controller('cardapioCtrl', function($scope, $http){
      $scope.lanches = [
        {nome:'PULP FICTION', ingredientes: 'PÃO DE HAMBÚRGUER, HAMBÚRGUER BOVINO, BACON EM FATIAS,CHEDDAR, ANÉIS EMPANADOS E MAIONESE ESPECIAL'},
        {nome:'KILL BILL 1', ingredientes: 'PÃO DE GERGELIM, HAMBÚRGUER DE FRANGO, QUEIJO PRATO, CEBOLA E PIMENTÃO AO MOLHO DE SOJA, MAIONESE E ALFACE AMERICANA'},
        {nome: 'KILL BILL 2', ingredientes: 'PÃO DE GERGELIM, HAMBÚRGUER SUÍNO, QUEIJO PRATO, CHAMPIGNON GRELHADO, MAIONESE DE WASABI E AGRIÃO'},
        {nome: 'BASTARDOS INGLÓRIOS', ingredientes: 'PÃO DE BAGUETE, LINGUIÇA SUÍNA, QUEIJO PRATO, PURÊ DE BATATA, MAIONESE DE MOSTARDA E VINAGRETE A BASE DE REPOLHO'},
        {nome: 'CÃES DE ALUGUEL', ingredientes: 'PÃO DE CACHORRO QUENTE, SALSICHA VEGETARIANA, MAIONESE ESPECIAL, VINAGRETE, BATATA PALHA E ALFACE AMERICANA'}
      ]
      $scope.massas = [
        {nome: 'OS BOAS-VIDAS', ingredientes: 'LASANHA BOLONHESA, PRESUNTO, QUEIJO, MOLHO AO SUGO, MOLHO BRANCO, MANJERICÃO E PARMESÃO'},
        {nome: '8½ - OITO E MEIO', ingredientes: 'LASANHA DE BRÓCOLIS, PARMESÃO, PROVOLONE, CATUPIRY, GORGONZOLA, MUSSARELA, GERGELIM E MANJERICÃO CORTADO'},
        {nome: 'GINGER E FRED ', ingredientes: 'RONDELLI DE PRESUNTO, QUEIJO, NOZ-MOSCADA, ORÉGANO E MOLHO AO SUGO'},
        {nome: 'A VOZ DA LUA ', ingredientes: 'RONDELLI DE FRANGO, CATUPIRY E MOLHO BRANCO'},
        {nome: 'AMORES NA CIDADE ' , ingredientes: 'PANQUECA DE PALMITO AO MOLHO SUGO'},
        {nome: 'ROMA ', ingredientes: 'PANQUECA DE CARNE COM BACON, AZEITONA VERDE E MOLHO AO SUGO'}
      ]
      $scope.doces = [
        {nome: 'BISCOITO DE CASTANHA-DO-PARÁ (150G)'},
        {nome: 'TORTA DE CUPUAÇU E GANACHE COM MASSA DE CASTANHA'},
        {nome: 'TORTINHA DE MORANGO'},
        {nome: 'TORTINHA DE LIMÃO'},
        {nome: 'TORTA HOLANDESA'},
        {nome: 'BOMBOM DE CUPUAÇU'}
      ]
      $scope.empadas = [
        {nome: 'CABRA MARCADO PARA MORRER', ingredientes: 'EMPADA DE VATAPÁ'},
        {nome: 'O FIM E O PRINCÍPIO', ingredientes: 'EMPADA DE PALMITO'},
        {nome: 'JOGO DE CENA ', ingredientes: 'EMPADA DE FRANGO, CATUPIRY'},
        {nome: 'BABILÔNIA 2000', ingredientes: 'EMPADA DE ALHO-PORÓ COM PARMESÃO'}
      ]
      $scope.tapiocas = [
        {nome: 'TERRA EM TRANSE', ingredientes: 'TAPIOCA DE CARNE SECA, CEBOLA E PURÊ DE ABÓBORA'},
        {nome: 'AMAZONAS, AMAZONAS', ingredientes: 'TAPIOCA DE QUEIJO COALHO E GOIABADA'},
        {nome: 'A IDADE DA TERRA', ingredientes: 'TAPIOCA DE QUEIJO BRANCO, TOMATE E MANJERICÃO'},
        {nome: 'O DRAGÃO DA MALDADE CONTRA O SANTO GUERREIRO', ingredientes: 'TAPIOCA DE CARNE MOÍDA, FEIJÃO FRADINHO E PIMENTA DEDO DE MOÇA'}
      ]
    })
  .controller('progracaoCtrl', function($scope, $http){
    $scope.programacao = [];

    $http({
      url: endpoint + '/programacao',
      method: 'GET'
    }).then(function(result){
      console.log(result.data);
      $scope.programacao = result.data;
    }), function(error){
      console.log('erro' + error.data.error);
    }
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
