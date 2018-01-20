'use strict';

angular.module('InsuControl')
.config(['$routeProvider',
	function($routeProvider) {
		
		$routeProvider
		.when('/categoria', {
			templateUrl: 'app/views/pages/categoria.html',
			controller: 'categoriaController'
		}) 

		.when('/usuarios', {
			templateUrl: 'app/views/pages/usuarios.html',
			controller: 'usuariosController'
		})

		.when('/alimentos', {
			templateUrl: 'app/views/pages/alimentos.html',
			controller: 'alimentosController'
		}) 

		.when('/mapa', {
			templateUrl: 'app/views/pages/mapa.html',
			controller: 'mapaController'
		}) 
		
		.otherwise({ redirectTo: '/404' });
	}
]);