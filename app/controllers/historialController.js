'use strict';
 
angular.module('InsuControl').config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    
  }])
.controller('historialController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {
         
         
        //var obtenerHistorial = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerHistorial.php"; 
	 	var obtenerHistorial = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerHistorial.php";
		var aGlucosa = [];
        var aCarbohidratos = [];
        var aInsulina = [];
        var aCant = [];
         
         $scope.dGlucosa = [];
         $scope.dCarbohidratos = [];
         $scope.dInsulina = [];
         $scope.labels = [];
         $scope.sGlucosa = ['Glucosa'];
         $scope.sCarbohidratos = ['Carbohidratos'];
         $scope.sInsulina = ['Insulina'];

		$scope.mostrarHistorial = function(){
			$http.post(obtenerHistorial, {'id_usuario': $rootScope.paciente_id})
		  	.then(function(response) {
                console.log(response.data.estado);
                if(response.data.estado == 1){
                    $scope.data = response.data.historial;
                //console.log(response.data.historial);
                    //console.log("con datos");
                    $scope.llenarDatos($scope.data);
                } else {
                    //console.log("sin datos0");
                }
		      
                
		  });
		}
		
		$scope.mostrarHistorial();
         
        $scope.llenarDatos = function(lin){
            $scope.datas = [];
            
            for (var i = 0; i < lin.length; i++){
                aGlucosa.push(lin[i].gs_actual);
                aCarbohidratos.push(lin[i].total_ch);
                aInsulina.push(lin[i].total_estimado);
                aCant.push(i);
            }
            $scope.dGlucosa[0] = aGlucosa;
            $scope.dCarbohidratos[0] = aCarbohidratos;
            $scope.dInsulina[0] = aInsulina;
            $scope.labels=aCant;
            
            console.log($scope.datas);
            //console.log(arreglo);
            
        }
        
        
		
	}//fin function principal
]);
