'use strict';
 
angular.module('InsuControl')
.controller('historialController', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 
	 function($scope, $rootScope, $location, $http, 
		localStorageService) {
         Chart.defaults.global.defaultFontColor = '#fff';
         
         
         var lectura = $rootScope.paciente_id;
         if (typeof lectura != 'undefined'){
         }else{
             $rootScope.paciente_nombre = $rootScope.apellido+" "+$rootScope.usuario;
             $rootScope.paciente_id = $rootScope.id_usuario;
         }
         
         
         
         
         
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
         
         
        var fHoy = new Date();
        var fSemana = new Date();
        fSemana.setDate(fSemana.getDate() - 7);

        $scope.sfHoy = (fHoy.getFullYear() + "-"+(fHoy.getMonth()+1)+"-"+fHoy.getDate()+" 23:59:00");
         $scope.sfPasado = (fSemana.getFullYear() + "-"+(fSemana.getMonth()+1)+"-"+fSemana.getDate()+" 00:00:00");
         

		$scope.mostrarHistorial = function(){
            //document.getElementById("nav_historial").className = "active";
			$http.post(obtenerHistorial, {'id_usuario': $rootScope.paciente_id, 'fecha1': $scope.sfPasado, 'fecha2':$scope.sfHoy})
		  	.then(function(response) {
            //    console.log("estado"+response.data.estado);
                if(response.data.estado == 1){
                    $scope.data = response.data.historial;
                //console.log(response.data.historial);
                    //console.log("con datos");
                    $scope.llenarDatos($scope.data);
                } else {
                    $scope.dGlucosa[0] = [0];
                    $scope.dCarbohidratos[0] = [0];
                    $scope.dInsulina[0] = [0];
                    alert("Usted no cuenta con historial");     
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
                var fec = new Date(lin[i].fecha)
                aCant.push((fec.getMonth()+1) + "-" + fec.getDate());
            }
            $scope.dGlucosa[0] = aGlucosa;
            $scope.dCarbohidratos[0] = aCarbohidratos;
            $scope.dInsulina[0] = aInsulina;
            $scope.labels=aCant;
            
       //     console.log($scope.datas);
            //console.log(arreglo);
            
        }
        
        
        angular.element(function () {
            document.getElementById("nav_historial").className = "active";
        });
        
        
        
        
        
        
		
	}//fin function principal
]);