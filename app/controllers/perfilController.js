'use strict';
 
angular.module('InsuControl')
.controller('perfilController', ['$scope', '$rootScope', '$location', '$http', 
	'localStorageService', 'AuthenticationService', 'AclService',
	function($scope, $rootScope, $location, $http, 
		localStorageService, AuthenticationService, AclService) {

	/* 	var usuarioL = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerUsuarioL.php";
	 	var obtenerCiudad = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";
	 	var obtenerProvincias = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudades = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCiudades.php";
		var modificarUsuario = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/modificarUsuario.php";
	*/

		var usuarioL = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerUsuarioL.php";
	 	var obtenerCiudad = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";
	 	var obtenerProvincias = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudades = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudades.php";
		var modificarUsuario = "http://localhost/pdo_servicios/Ws_Ic/vista/modificarUsuario.php";
	
		$scope.obtenerProvincias = function(){
			$http.post(obtenerProvincias)
			  .then(function(response) {
			  	if(response.data.estado == 1) {
			      $scope.provincias = response.data.provincias;
				}
			});
		}

		$scope.obtenerCiudad = function(){
			$http.post(obtenerCiudad, {'id_provincia': $scope.miProvincia.id_provincia})
			  .then(function(response) {
			  	if(response.data.estado == 1) {
			      $scope.ciudadXProv = response.data.ciudadXProv;
				}
			});
		}
		
		$scope.obtenerCiudades = function(){
			$http.post(obtenerCiudades)
			  .then(function(response) {
			  	if(response.data.estado == 1) {
			      $scope.ciudades = response.data.ciudades;
			    }
			});
		}

		$scope.modificarUsuario = function(){
			$http.post(modificarUsuario, {'id_usuario': $scope.id_usuario, 
				'nombre': $scope.usuario, 'apellido': $scope.apellido,
				'correo': $scope.correo, 'nic': $scope.nic, 
				'sexo': $scope.genero, 'fecha_nacimiento': $scope.fecha_nacimiento,
				'clave': $scope.clave, 'id_ciudad': $scope.miCiudad.id_ciudad})
			.then(function(response){
				if(response.data.estado == 1) {
					var id_usuario = response.config.data.id_usuario;
					$http.post(usuarioL, {'id_usuario': id_usuario})
						.then(function(response) {
							if(response.data.estado == 1) {
						    	$scope.datos = response.data.usuarioL;
						    	AuthenticationService.setCredentials($scope.datos[0]);
						    }
						});
					alert("Usuario Modificado");
		    	}
		    });
		}

		$scope.obtenerProvincias();
		$scope.obtenerCiudades();
		$scope.obtenerCiudad();


		$scope.today = function() {
    		$scope.dt = new Date();	
  		};
  		$scope.today();

	  	$scope.toDate = function(strDt) {
	   		return new Date(strDt);
	  	}
  
	  	$scope.clear = function () {
	    	$scope.dt = null;
	  	};

	  	// Disable weekend selection
	  	$scope.disabled = function(date, mode) {
	    	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  	};

	  	$scope.toggleMin = function() {
	    	$scope.minDate = $scope.minDate ? null : new Date();
	  	};
	  	$scope.toggleMin();
	  
	  	// Open pop-up
	  	$scope.open = function($event) {
	    	$event.preventDefault();
	    	$event.stopPropagation();
	    	$scope.opened = true;
	  	};

	  	$scope.dateOptions = {
	    	formatYear: 'yy',
	    	startingDay: 1
	  	};

	  	$scope.formats = [
	    	'dd-MMMM-yyyy',
	    	'yyyy/MM/dd',
	    	'dd.MM.yyyy',
	    	'shortDate'
	  	];
	  	$scope.format = $scope.formats[3];
        
        angular.element(function () {
            document.getElementById("nav_perfil").className = "active";
        });

	}
]);
