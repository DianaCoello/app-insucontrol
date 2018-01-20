'use strict';
 
angular.module('InsuControl')
.controller('mapaController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	 	var url = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerGPS.php";
		$http.post(url)
		  .then(function(response) {
		      $scope.data = response.data.localizacion;
		      //console.log($scope.data);
		  });
	}
]);