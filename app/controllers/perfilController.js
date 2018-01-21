'use strict';
 
angular.module('InsuControl')
.controller('perfilController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	function($scope, $rootScope, $location, $http, 
		localStorageService) {

	 	var obtenerUsuario = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerUsuario.php";
	 	var obtenerCiudad = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";
	 	var obtenerProvincias = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudades = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudades.php";
		var modificarUsuario = "http://localhost/pdo_servicios/Ws_Ic/vista/modificarUsuario.php";

		$scope.mostrarUsuario = function(){
			$http.post(obtenerUsuario)
			.then(function(response) {
			    $scope.datos = response.data.usuarios;
			});
		}

		$scope.obtenerProvincias = function(){
			$http.post(obtenerProvincias)
			  .then(function(response) {
			      $scope.provincias = response.data.provincias;
			});
		}

		$scope.obtenerCiudad = function(){
			console.log($scope.miProvincia.id_provincia);
			$http.post(obtenerCiudad, {'id_provincia': $scope.miProvincia.id_provincia})
			  .then(function(response) {
			      $scope.ciudadXProv = response.data.ciudadXProv;
			     // console.log($scope.ciudadXProv);
			});
		}
		

		$scope.obtenerCiudades = function(){
			$http.post(obtenerCiudades)
			  .then(function(response) {
			      $scope.ciudades = response.data.ciudades;
			});
		}

//id_usuario, $nombre, $apellido, $correo,   $nic, $sexo, $fecha_nacimiento, $clave
		$scope.modificarUsuario = function(){
			$http.post(modificarUsuario, {'id_usuario': $scope.id_usuario, 
				'nombre': $scope.usuario, 'apellido': $scope.apellido,
				'correo': $scope.correo, 'nic': $scope.nic, 
				'sexo': $scope.sexo, 'fecha_nacimiento': $scope.fecha_nacimiento,
				'clave': $scope.clave})
			.then(function(response){
				$scope.mostrarUsuario();
				console.log(response);
		    	
		    });
		}


		$scope.obtenerProvincias();
		$scope.obtenerCiudades();
		$scope.obtenerCiudad();
		$scope.modificarUsuario();


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
