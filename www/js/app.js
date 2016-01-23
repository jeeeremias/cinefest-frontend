// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'cinefestApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'cinefestApp.controllers' is found in controllers.js
var app = angular.module('cinefestApp', ['ionic', 'ngCordova', 'cinefestApp.controllers','filmeServices','ngCpfCnpj','ui.mask'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html'
  })

  .state('cadastro', {
    url: '/cadastro',
    templateUrl: 'templates/cadastro.html'
  })

  .state('lista_filmes', {
    url: '/lista_filmes',
      templateUrl: 'templates/lista_filmes.html'
  })
    .state('detalhe_filme', {
      url: '/detalhe_filme',
      templateUrl: 'templates/detalhe_filme.html'
    })
    .state('votacao', {
      url: '/votacao',
      templateUrl: 'templates/votacao.html'
    })
    .state('sessao_paladar', {
      url: '/sessao_paladar',
      templateUrl: 'templates/sessao_paladar.html'
    })
    .state('programacao', {
      url: '/programacao',
      templateUrl: 'templates/programacao.html'
    })
    .state('sobre', {
      url: '/sobre',
      templateUrl: 'templates/sobre.html'
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu');
});
