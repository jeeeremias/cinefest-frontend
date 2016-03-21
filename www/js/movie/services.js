angular.module('cinefestApp.services')

.service('movieService', function($http, CONSTANTS) {

	this.getFilmes = function(data) {
		return $http({
			url: CONSTANTS.URL_LIST_MOVIES_LOCAL,
			method: 'GET',
			params: data
		});
	};
});
