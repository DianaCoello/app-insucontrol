'use strict';
 
angular.module('InsuControl')
.controller('alimentosController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	 	var url = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerAlimento.php";
		$http.post(url)
		  .then(function(response) {
		      $scope.data = response.data.alimentos;
		      console.log($scope.data);
		  });
	}
]);
