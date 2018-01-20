'use strict';
 
angular.module('InsuControl')
.controller('mapaController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	 	
	 	//var obtenerGPS = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerGPS.php";
	 	var obtenerGPS = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerGPS.php";
		$http.post(obtenerGPS)
		  .then(function(response) {
		      $scope.data = response.data.localizacion;
		      //console.log($scope.data);
		  });
	}
]);
