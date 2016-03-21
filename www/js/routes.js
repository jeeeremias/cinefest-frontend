var app = angular.module('cinefestApp');

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('menu', {
		url: '/menu',
		templateUrl: 'templates/menu.html'
	})

	.state('cadastro', {
		url: '/cadastro',
		templateUrl: 'templates/cadastro.html'
	})

	.state('list_movie', {
		url: '/list-movie',
		templateUrl: 'templates/list-movie.html'
	})

	.state('detalhe_filme', {
		url: '/detalhe_filme',
		params: {
		filme: null
		},
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
