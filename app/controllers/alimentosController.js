'use strict';
 
angular.module('InsuControl')
.controller('alimentosController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	// 	var obtenerAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerAlimento.php";
	//	var obtenerCategoria = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCategoria.php";
	//	var guardarAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/guardarAlimento.php";
	//	var buscarAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/guardarAlimento.php";


	 	var obtenerAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerAlimento.php";
		var obtenerCategoria = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCategoria.php";
		var guardarAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/guardarAlimento.php";
		var buscarAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/guardarAlimento.php";

		$http.post(obtenerAlimento)
		  .then(function(response) {
		      $scope.data = response.data.alimentos;
		  });

		$http.post(obtenerCategoria)
		  .then(function(response) {
		      $scope.categoria = response.data.categoria;
		 	});

		
		$scope.insertarAlimentos = function(){
			$http.post(guardarAlimento, {'id_categoria': $scope.id_categoria, 
				'nombre': $scope.nombre, 'porcion': $scope.porcion,
				'peso_porcion': $scope.peso_porcion, 'gramos_ch': $scope.gramos_ch, 
				'cant_porcion': $scope.cant_porcion})
			.then(function(response){
				console.log($scope.id_categoria);
		      console.log(response);
			});
		}

	/*	var data = $scope.id_ch;

		$scope.buscarAlimentos = function(){
			$http.post(buscarAlimento, {'id_ch': $scope.id_categoria})
			.then(function(response){
				console.log($scope.id_ch);
		      console.log(response);
			});
		}
*/

	}//fin function principal
]);
