'use strict';
 
angular.module('InsuControl')
.controller('usuariosController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {
         
         
         
        //var obtenerHistorial = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerHistorial.php"; 
	 	var obtenerHistorial = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerHistorial.php"; 
	 	var url = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerUsuario.php";
	// 	var url = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerUsuario.php";
         
         $http.post(url)
		  .then(function(response) {
		      $scope.datos = response.data.usuarios;
		  });
         
         /*---Rango de Fecha---*/
         var fHoy = new Date();
        var fSemana = new Date();
        fSemana.setDate(fSemana.getDate() - 7);
        $scope.sfHoy = (fHoy.getFullYear() + "-"+(fHoy.getMonth()+1)+"-"+fHoy.getDate()+" 23:59:00");
         $scope.sfPasado = (fSemana.getFullYear() + "-"+(fSemana.getMonth()+1)+"-"+fSemana.getDate()+" 00:00:00");
         /*------*/

         /*---Preguntar por historial---*/
         $scope.buscarHistorial = function(id_usuario, nombre){
			 $rootScope.paciente_id = id_usuario;
             $rootScope.paciente_nombre = nombre;
             $http.post(obtenerHistorial, {'id_usuario': $rootScope.paciente_id, 'fecha1': $scope.sfPasado, 'fecha2':$scope.sfHoy})
		  	.then(function(response) {
                if(response.data.estado == 1){
                    $scope.data = response.data.historial;
                        $location.path('/historial');
                    $scope.llenarDatos($scope.data);
                } else {
                    alert("El usuario no cuenta con historial");
                }
           });  	
		}
         
         angular.element(function () {
            document.getElementById("nav_usuario").className = "active";
        });
	}
]);
