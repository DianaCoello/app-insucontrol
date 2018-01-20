'use strict';
 
angular.module('InsuControl')
.controller('categoriaController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	 	var url = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCategoria.php";
	 //	var url = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCategoria.php";
		$http.post(url)
		  .then(function(response) {
		      $scope.datos = response.data.categoria;
		      console.log($scope.datos);
		  });
	}
]);
