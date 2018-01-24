'use strict';
 
angular.module('InsuControl')
.controller('perfilController', ['$scope', '$rootScope', '$location', '$http', 
	'localStorageService', 'AuthenticationService',
	function($scope, $rootScope, $location, $http, 
		localStorageService, AuthenticationService) {

	/* 	var obtenerUsuario = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerUsuario.php";
	 	var obtenerCiudad = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";
	 	var obtenerProvincias = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudades = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCiudades.php";
		var modificarUsuario = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/modificarUsuario.php";
	*/

		var obtenerUsuario = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerUsuario.php";
	 	var obtenerCiudad = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";
	 	var obtenerProvincias = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudades = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudades.php";
		var modificarUsuario = "http://localhost/pdo_servicios/Ws_Ic/vista/modificarUsuario.php";

		$scope.mostrarUsuario = function(){
			$http.post(obtenerUsuario)
			.then(function(response) {
				if(response.data.estado == 1) {
			    	$scope.datos = response.data.usuarios;
			    }
			});
		}

		$scope.obtenerProvincias = function(){
			$http.post(obtenerProvincias)
			  .then(function(response) {
			  	if(response.data.estado == 1) {
			      $scope.provincias = response.data.provincias;
				}
			});
		}

		$scope.obtenerCiudad = function(){
			console.log($scope.miProvincia.id_provincia);
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
			console.log($scope.id_usuario);
			$http.post(modificarUsuario, {'id_usuario': $scope.id_usuario, 
				'nombre': $scope.usuario, 'apellido': $scope.apellido,
				'correo': $scope.correo, 'nic': $scope.nic, 
				'sexo': $scope.genero, 'fecha_nacimiento': $scope.fecha_nacimiento,
				'clave': $scope.clave, 'id_ciudad': $scope.miCiudad.id_ciudad})
			.then(function(response){
				if(response.data.estado == 1) {
					var data = response.config.data;
					console.log(data);
					 AuthenticationService.setCredentials(data);
					$scope.mostrarUsuario();
		    	}
		    });
		}


		$scope.obtenerProvincias();
		$scope.obtenerCiudades();
		$scope.obtenerCiudad();
		//$scope.modificarUsuario();


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

	}
]);
