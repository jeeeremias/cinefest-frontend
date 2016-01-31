var app = angular.module('cinefestApp.controllers', []);
var endpoint = 'http://rest-cinefest.rhcloud.com';
//  var endpoint = 'http://localhost:8080';

app.controller ('barCtrl', function ($scope, $ionicHistory) {
  $scope.goBack = function () {
    $ionicHistory.goBack();
  };
});

app.controller('filmeCtrl', function ($scope, $http, $ionicLoading, $cordovaToast, Filmes, Imagem, sharedProperties, $state) {
  console.log('baixando filmes');
  $scope.requestListFilmes = {pag: 0, tam: 5}
  $scope.lista = [];
  $scope.noMoreItemsAvailable = false;
  $scope.loadMore = function () {
    $http({
      url: endpoint + '/filmes',
      method: "GET",
      params: $scope.requestListFilmes
    }).then(function (result) {
      if (result.data.length == 0) {
        $scope.noMoreItemsAvailable = true;
      }
      for (var i in result.data) {
        $scope.lista.push(result.data[i]);
      }
      console.log($scope.lista);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.requestListFilmes.pag++;
    }, function (error) {
      $cordovaToast.showLongBottom(error.data.error);
    });
  };

  $scope.nome = function (idFilme) {
    sharedProperties.setProperty(idFilme);
    console.log('id passado' + idFilme);
    $state.go('detalhe_filme');
  };
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
});

app.controller('detalhesCtrl', function ($scope, $http, sharedProperties) {
  $scope.id = {id: sharedProperties.getProperty()};
  $http({
    url: endpoint + '/filme',
    method: "GET",
    params: $scope.id
  }).then(function (result) {
    console.log(result.data);
  }, function (error) {
    console.log('erro' + error.data.error);
  });
});
app.controller('MenuCtrl', function ($scope, $http, $state, $q, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, UserService) {
    $scope.go = function (pagina) {
      $state.go(pagina);
    }
  })

  .controller('RegisterCtrl', function ($scope, $http, $state, $cordovaToast) {

    $scope.usuario = {};

    $scope.submitCadastro = function () {
      $http({
        url: endpoint + '/cadastro',
        method: "POST",
        data: $scope.usuario
      }).then(function (result) {
        if (result.data.sucesso) {
          console.log(result.data.mensagem);
          $state.go('login');
        } else {
          $cordovaToast.showLongBottom(result.data.mensagem);
        }
      }, function (error) {
        $cordovaToast.showLongBottom(error.data.error);
      });
    }
  })
  .controller('votoCtrl', function ($scope, $http) {
    $scope.lista = [];
    $scope.requestListFilmes = {pag: 0, tam: 10}
    $http({
      url: endpoint + '/filmes',
      method: 'GET',
      params: $scope.requestListFilmes
    }).then(function (result) {
      console.log(result.data);
      $scope.lista = result.data;
    }), function (error) {
      console.log('erro' + error.data.error);
    }

    $scope.voto = {};
    $scope.submitForm = function () {
      $scope.submitted = true;
      if ($scope.submitted == true) {
        console.log("Clicou no botão confirmar");
      }
    }
  })
  .controller('cardapioCtrl', function ($scope) {

    $scope.lanches = new getLanches().lanches;
    $scope.massas = new getMassas().massas;
    $scope.doces = new getDoces().doces;
    $scope.empadas = new getEmpadas().empadas;
    $scope.tapiocas = new getTapiocas().tapiocas;
  })
  .controller('progracaoCtrl', function ($scope, $timeout) {
    $scope.dia = 15;

    $scope.mes = "/02";
    $scope.diaSemana = 'Segunda-Feira';
    $scope.programacao = new getProgramacao().primeiroDia;

    $scope.$watch("dia", function(){

      switch ($scope.dia) {
        case 15:
          console.log('dia 15');
          $scope.diaSemana = 'Segunda-Feira';
          atualizarView(new getProgramacao().primeiroDia);
          break;
        case 16:
          console.log('dia 16');
          $scope.diaSemana = 'Terça-Feira';
          atualizarView(new getProgramacao().segundoDia);
          break;
        case 17:
          console.log('dia 17');
          $scope.diaSemana = 'Quarta-Feira';
          atualizarView(new getProgramacao().terceiroDia);
          break;
        case 18:
          console.log('dia 18');
          $scope.diaSemana = 'Quinta-Feira';
          atualizarView(new getProgramacao().quartoDia);
          break;
        case 19:
          console.log('dia 19');
          $scope.diaSemana = 'Sexta-Feira';
          atualizarView(new getProgramacao().quintoDia);
          break;
        case 20:
          console.log('dia 20');
          $scope.diaSemana = 'Sábado';
          atualizarView(new getProgramacao().sextoDia);
          break;
        case 21:
          console.log('dia 21');
          $scope.diaSemana = 'Domingo';
          atualizarView(new getProgramacao().setimoDia);
          break;
        case 22:
          console.log('dia 22');
          $scope.diaSemana = 'Segunda-Feira';
          atualizarView(new getProgramacao().oitavoDia);
          break;
        case 23:
          console.log('dia 23');
          $scope.diaSemana = 'Terça-Feira';
          atualizarView(new getProgramacao().nonoDia);
          break;
        case 24:
          console.log('dia 24');
          $scope.diaSemana = 'Quarta-Feira';
          atualizarView(new getProgramacao().decimoDia);
          break;
        case 25:
          console.log('dia 25');
          $scope.diaSemana = 'Quinta-Feira';
          atualizarView(new getProgramacao().decimopDia);
          break;
        case 26:
          console.log('dia 26');
          $scope.diaSemana = 'Sexta-Feira';
          atualizarView(new getProgramacao().decimosDia);
          break;
        case 27:
          console.log('dia 27');
          $scope.diaSemana = 'Sábado';
          atualizarView(new getProgramacao().decimotDia);
          break;
      }
    });

    atualizarView = function (valor) {
      $timeout(function () {
        $scope.$apply(function () {
          $scope.programacao = valor;
        })});
    };

    $scope.proximo = function () {
      $scope.dia ++;
    };
    $scope.anterior = function () {
      $scope.dia --;
    };
  });

var compareTo = function () {
  return {
    require: "ngModel", scope: {
      otherModelValue: "=compareTo"
    },
    link: function (scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue == scope.otherModelValue;
      };
      scope.$watch("otherModelValue", function () {
        ngModel.$validate();
      });
    }
  };
};
app.directive("compareTo", compareTo);
