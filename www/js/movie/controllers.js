var movie = angular.module('cinefestApp.controllers')

movie.controller('listMovieCtrl', function (movieService, $state, $scope, CONSTANTS) {
  var vm = this
  vm.$scope = $scope;
  vm.imgLink = CONSTANTS.URL_IMAGE_LOCAL;
  vm.requestListMovies = {pag: 0, tam: 5}
  vm.movies = [];
  vm.noMoreItemsAvailable = false;
  vm.loadMore = function () {
    console.log('test');
    movieService.getFilmes(vm.requestListMovies)
      .then(addFilmes, showError);
      function addFilmes(response) {
        if (response.data.length == 0) {
          vm.$scope.noMoreItemsAvailable = true;
        }
        for (var i in response.data) {
          vm.movies.push(response.data[i]);
        }
        vm.$scope.$broadcast('scroll.infiniteScrollComplete');
        vm.requestListMovies.pag++;
      };
      function showError(response) {
        /// TODO:
      };
  };
  vm.$scope.$on('$stateChangeSuccess', function() {
    vm.loadMore();
  });

  this.detalhe = function (filme) {
    $state.go('detalhe_filme', {filme: filme});
  };
  this.goBack = function () {
    $ionicHistory.goBack();
  }
});

movie.controller('detalhesCtrl', function ($scope, $http, $state) {
  $scope.filme = $state.params.filme;
});

/*
  .controller('cardapioCtrl', function ($scope, $timeout, $ionicLoading) {
    $scope.cardapio = 0;
    $scope.proximo = function () {
      $scope.cardapio ++;
    };
    $scope.anterior = function () {
      $scope.cardapio --;
    };
    $scope.nome = [
    'LANCHES',
    'MASSAS',
    'DOCES',
    'EMPADAS',
    'TAPIOCAS'
    ];

    $scope.show = function() {
    $ionicLoading.show({
      template: 'Carregando...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

    $scope.$watch("cardapio", function(){

      switch ($scope.cardapio) {
        case 0:
          atualizarView(new getLanches().lanches, 'img/cardapio/lanches.png');
          break;
        case 1:
          $scope.show()
          atualizarView(new getMassas().massas, 'img/cardapio/massa.png');
          $scope.hide();
          break;
        case 2:
          atualizarView(new getDoces().doces, 'img/cardapio/doce.png');
          break;
        case 3:
          atualizarView(new getEmpadas().empadas, 'img/cardapio/empada.png');
          break;
        case 4:
          atualizarView(new getTapiocas().tapiocas, 'img/cardapio/tapioca.png');
          break;
      }
    });
    atualizarView = function (valor, image) {
      $scope.show();
      $timeout(function () {
        $scope.$apply(function () {
          $scope.opcoes = valor;
          $scope.imagem = image;
        })
        $scope.hide();
      }, 1000);
    };
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
movie.directive("compareTo", compareTo);*/
