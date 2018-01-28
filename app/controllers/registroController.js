'use strict';
angular.module('InsuControl')
.controller('registroController', ['$scope', '$rootScope', '$location', '$http',
	 function($scope, $rootScope, $location, $http) {
	/* 	var guardarUsuario = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/guardarUsuario.php";
		var obtenerProvincia = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudad = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";
	*/

	 	var guardarUsuario = "http://localhost/pdo_servicios/Ws_Ic/vista/guardarUsuario.php";
		var obtenerProvincia = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudad = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";

		$scope.guardarUsuario = function(){
			$http.post(guardarUsuario, {'nombre': $scope.nombre_user, 
				'apellido': $scope.apellido_usuario, 'correo': $scope.email,
				'nic': $scope.cedula, 'sexo': $scope.sexo, 
				'fecha_nacimiento': $scope.nacimiento,
				'clave': $scope.clave, 'id_ciudad': $scope.id_ciudad})
			.then(function(response){
				if (response.data.estado == 1) {
					alert("Usuario registrado");
		    		$scope.clearForm();
		    		$location.path('/login');
				}else{
					alert("El usuario ya existe");
				}
			});
		} 

		$scope.obtenerProvincia = function(){
			$http.post(obtenerProvincia)
			  .then(function(response) {
			  	if(response.data.estado == 1) {
			      	$scope.provincias = response.data.provincias;
				}
			});
		}

		$scope.obtenerCiudad = function(){
			$http.post(obtenerCiudad, {'id_provincia': $scope.id_provincia})
			  .then(function(response) {
			  	if(response.data.estado == 1) {
			      $scope.ciudades = response.data.ciudadXProv;
				}
			});
		}

		$scope.obtenerProvincia();
		$scope.obtenerCiudad();

		$rootScope.GeneroChange = function (s) {
                $rootScope.generoSelect = s;
            };

		$scope.clearForm =function() {
			$('#registro input[type="text"]').val("");
		}
	}
]);