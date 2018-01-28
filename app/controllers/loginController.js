'use strict';
 
angular.module('InsuControl')
.controller('loginController',
    ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'AuthenticationService',
    function ($scope, $rootScope, $location, $http, localStorageService, AuthenticationService) {
        
        var userLogin = "http://localhost/pdo_servicios/Ws_Ic/vista/autenticacion_login.php";
        var obtenerTipoUser = "http://localhost/pdo_servicios/Ws_Ic/vista/obtenerTipoUsuario.php";


//        var userLogin = "http://insucontrol.life/pdo_servicios/Ws_Ic/vista/autenticacion_login.php";
 
        $scope.init = function() {
            if (AuthenticationService.isLoggedIn()) {
                $location.path('/perfil');
            }
        }

        $scope.login = function(){  
            $http.post(userLogin, 
                {'correo': $scope.correo, 'clave': $scope.clave})
            .then(function(response) {
                var data = response.data.login;
                if(response.data.estado == 1) {
                    $location.path('/perfil');
                    AuthenticationService.setCredentials(data);
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

     $scope.init();
     $scope.obtenerTipoUsuario();
    }  
]);