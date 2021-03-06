'use strict';
 
angular.module('InsuControl')
.controller('alimentosController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {

	/* 	var obtenerAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerAlimento.php";
		var obtenerCategoria = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerCategoria.php";
		var guardarAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/guardarAlimento.php";
		var buscarAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/buscarAlimento.php";
	  	var modificarAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/modificarAlimento.php";
		var eliminarAlimento = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/eliminarAlimento.php";
	*/

	 	var obtenerAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerAlimento.php";
		var obtenerCategoria = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerCategoria.php";
		var guardarAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/guardarAlimento.php";
		var buscarAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/buscarAlimento.php";
		var modificarAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/modificarAlimento.php";
		var eliminarAlimento = "http://localhost/pdo_servicios/Ws_Ic/vista/eliminarAlimento.php";


		$scope.mostrarAlimento = function(){
			$http.post(obtenerAlimento)
		  	.then(function(response) {
				if (response.data.estado == 1) {
		   		   $scope.data = response.data.alimentos;
		  		}
		  });
		}
		
		$scope.mostrarAlimento();

		$http.post(obtenerCategoria)
		  .then(function(response) {
	  		if (response.data.estado == 1) {
		      $scope.categoria = response.data.categoria;
		  	}
		 });

		
		$scope.insertarAlimentos = function(){
            if (typeof $scope.id_categoria != 'undefined'){
                $http.post(guardarAlimento, {'id_categoria': $scope.id_categoria, 
				'nombre': $scope.nombre, 'porcion': $scope.porcion,
				'peso_porcion': $scope.peso_porcion, 'gramos_ch': $scope.gramos_ch, 
				'cant_porcion': $scope.cant_porcion})
			.then(function(response){
				if (response.data.estado == 1) {
		    		$scope.clearForm();
			      	$scope.mostrarAlimento();
			      	$location.path('/alimentos');
			      	alert("Registro exitoso!\nNuevo alimento: "+$scope.nombre);
				}
			});
            } else {
                alert("Seleccione una categoria.");
            }
			
		}


		$scope.buscarAlimentos = function(id_ch){
			$http.post(buscarAlimento, {'id_ch': id_ch})
			.then(function(response){
				if (response.data.estado == 1) {
					var dataAlimento = response.data.alimento;
					$scope.id_ch = dataAlimento[0].id_ch;
	                $scope.id_categoria = dataAlimento[0].id_categoria;
	                $scope.nombre = dataAlimento[0].nombre;
	                $scope.porcion = dataAlimento[0].porcion;
	                $scope.peso_porcion = dataAlimento[0].peso_porcion;
	                $scope.gramos_ch = dataAlimento[0].gramos_ch;
	                $scope.cant_porcion = dataAlimento[0].cant_porcion;
                    
                    document.getElementById("mdlNombre").classList.remove("is-empty");
                    document.getElementById("mdlPorcion").classList.remove("is-empty");
                    document.getElementById("mdlPesoPorcion").classList.remove("is-empty");
                    document.getElementById("mdlGramos").classList.remove("is-empty");
                    document.getElementById("mdlCantidad").classList.remove("is-empty");
               	}
			});
		}

		$scope.modificarAlimentos = function(){
			$http.post(modificarAlimento, {'id_categoria': $scope.id_categoria, 
				'nombre': $scope.nombre, 'porcion': $scope.porcion,
				'peso_porcion': $scope.peso_porcion, 'gramos_ch': $scope.gramos_ch, 
				'cant_porcion': $scope.cant_porcion, 'id_ch': $scope.id_ch})
			.then(function(response){
				if (response.data.estado == 1) {
					$scope.mostrarAlimento();
			    	$scope.clearForm();
			    	$location.path('/alimentos');
			    	alert("Alimento Modificado");
			    }
			});
		}

		$scope.eliminarAlimento = function(id_ch){
			$http.post(eliminarAlimento, {'id_ch': id_ch})
			.then(function(response) {
				if (response.data.estado == 1) {
		  			$scope.mostrarAlimento();
		  			$location.path('/alimentos');
		  			alert("Alimento Eliminado");
		  		}
		 	});
		}

		$scope.clearForm =function() {
			$('#alimentosForm input[type="text"]').val("");
		}

		$scope.mostrarAlimento();
         
         angular.element(function () {
            document.getElementById("nav_alimentos").className = "active";
        });
	}//fin function principal
]);
