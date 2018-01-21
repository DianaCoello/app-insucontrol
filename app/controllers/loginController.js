'use strict';
 
angular.module('InsuControl')
.controller('loginController',
    ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'AuthenticationService',
    function ($scope, $rootScope, $location, $http, localStorageService, AuthenticationService) {
        
        var userLogin = "http://localhost/pdo_servicios/Ws_Ic/vista/autenticacion_login.php";

        $scope.init = function() {
            if (AuthenticationService.isLoggedIn()) {
                console.log("hola");
                $location.path('/usuarios');
            }
        }

    /*    $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.correo, $scope.clave, 
                function(response) {
                    if(response.estado === 1) {
                        AuthenticationService.setCredentials($scope.correo, $scope.clave);
                        $location.path('/usuarios');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });*/

        $scope.login = function(){  
            $http.post("http://localhost/pdo_servicios/Ws_Ic/vista/autenticacion_login.php", 
                {'correo': $scope.correo, 'clave': $scope.clave})
            .then(function(response) {
                var data = response.data.login;
                console.log(data);
                if(response.data.estado == 1) {
                    console.log(response.data.estado);
                    AuthenticationService.setCredentials(data);
                    $location.path('/usuarios');
                } else {
                  //  alert(response.mensaje);
                }

          });
        }

    /*    $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.correo, $scope.clave,
            function(response) {
                console.log(response);
                    if(response.estado === 1) {
                        var data = response.datos[0];
                        AuthenticationService.setCredentials($scope.correo, $scope.clave);
                        $location.path('/usuarios');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
            });
        };
    */

     $scope.init();
    }  
]);