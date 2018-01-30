'use strict';
angular.module('InsuControl')
.controller('registroController', ['$scope', '$rootScope', '$location', '$http',
	 function($scope, $rootScope, $location, $http) {
	/* 	var guardarUsuario = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/guardarUsuario.php";
		var obtenerProvincia = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudad = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";
	*/
         var vacios = false;
         var mVacio = "Debe llenar los siguientes campos\n"
	 	var guardarUsuario = "http://localhost/pdo_servicios/Ws_Ic/vista/guardarUsuario.php";
		var obtenerProvincia = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerProvincias.php";
	 	var obtenerCiudad = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCiudadXProv.php";

		$scope.guardarUsuario = function(){
            console.log("Fecha: "+$scope.dt+" Sexo: "+$scope.sexo+" Ciudad: "+$scope.ciudad);
            $scope.verificarVacio();
            if (!vacios){
                $http.post(guardarUsuario, {'nombre': $scope.nombre_user, 
				'apellido': $scope.apellido_usuario, 'correo': $scope.email,
				'nic': $scope.cedula, 'sexo': $scope.sexo, 
				'fecha_nacimiento': $scope.dt,
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
            }else{
                alert(mVacio);
                mVacio = "Debe llenar los siguientes campos\n";
                vacios = false;
            }
		} 
        
        $scope.verificarVacio = function(){
            if(typeof $scope.sexo == 'undefined'){
                vacios = true;
                mVacio += "Sexo\n";
            }
            if(typeof $scope.id_provincia == 'undefined'){
                vacios = true;
                mVacio += "Provincia\n";
            }
            if(typeof $scope.id_ciudad == 'undefined'){
                vacios = true;
                mVacio += "Ciudad\n";
            }
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