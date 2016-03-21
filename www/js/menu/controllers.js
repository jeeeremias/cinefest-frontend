var movie = angular.module('cinefestApp.controllers')

movie.controller('menuCtrl', function ($state) {
  var vm = this;
  vm.go = function (pagina) {
    $state.go(pagina);
  }
});
