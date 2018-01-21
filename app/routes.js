'use strict';

angular.module('InsuControl')
.config(['$routeProvider',
	function($routeProvider) {
		
		$routeProvider
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'loginController'
		}) 

		.when('/perfil', {
			templateUrl: 'app/views/pages/perfil.html',
			controller: 'perfilController'
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