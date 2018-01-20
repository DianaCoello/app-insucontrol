'use strict';
 
angular.module('InsuControl')
.controller('usuariosController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	 	var url = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerUsuario.php";
		$http.post(url)
		  .then(function(response) {
		      $scope.datos = response.data.usuarios;
		      console.log($scope.datos);
		  });
	}
]);
