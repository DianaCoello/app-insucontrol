'use strict';
 
angular.module('InsuControl')
.controller('usuariosController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	 	var url = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerUsuario.php";
		$http.post(url)
		  .then(function(response) {
		      $scope.datos = response.data.usuarios;
		      //console.log($scope.datos);
		  });
         
         
         $scope.buscarHistorial = function(id_usuario, nombre){
			 $rootScope.paciente_id = id_usuario;
             $rootScope.paciente_nombre = nombre;
             $location.path('/historial');
			
		}
	}
]);
