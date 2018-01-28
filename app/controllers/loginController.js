'use strict';
 
angular.module('InsuControl')
.controller('loginController',
    ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'AuthenticationService',
    function ($scope, $rootScope, $location, $http, localStorageService, AuthenticationService) {
        
        var userLogin = "http://localhost/pdo_servicios/Ws_Ic/vista/autenticacion_login.php";
        var obtenerTipoUser = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerTipoUsuario.php";
        var opcionUser = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerOpciones.php";

    /*   var userLogin = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/autenticacion_login.php";
        var obtenerTipoUser = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/obtenerTipoUsuario.php";
        */

        $scope.init = function() {
            if (AuthenticationService.isLoggedIn()) {
                $location.path('/perfil');
            }
        }

        $scope.login = function(){
            console.log("correo "+$scope.correo+" clave: "+$scope.clave);
            $http.post(userLogin, 
                {'correo': $scope.correo, 'clave': $scope.clave})
            .then(function(response) {
                var data = response.data.login;
                if(response.data.estado == 1) {
                    $scope.obtenerOpciones(data.id_tipo_usuario);
                    AuthenticationService.setCredentials(data);
                    $location.path('/perfil');
                } else {
                    alert(response.mensaje);
                }
          });
        }

        $scope.obtenerTipoUsuario = function(){
            $http.post(obtenerTipoUser)
            .then(function(response) {
                if (response.data.estado == 1) {
                   $scope.data = response.data.tipo_usuario;
                }
          });
        }
        
        $scope.obtenerOpciones = function(tipoUsuario){
            $http.post(opcionUser, 
                {'id_tipo_user': tipoUsuario})
            .then(function(response) {
                var opc = response.data.opciones;
                if(response.data.estado == 1) {
                    AuthenticationService.setOpciones(opc);
                } else {
                    alert(response.mensaje);
                }
          });
        }

     $scope.init();
     $scope.obtenerTipoUsuario();
    }  
]);