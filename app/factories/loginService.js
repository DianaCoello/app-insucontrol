'use strict';
 
angular.module('InsuControl')
.factory('AuthenticationService', ['$http', '$rootScope', 'localStorageService',
    function ($http, $rootScope, localStorageService) {

        var service = {};

        service.setCredentials = function(data) {
            localStorageService.set('usuario', data);
            $rootScope.usuario = data.nombre;
            $rootScope.id_usuario = data.id_usuario;
            $rootScope.apellido = data.apellido;
            $rootScope.nic = data.nic;
            $rootScope.correo = data.correo;
            $rootScope.clave = data.clave;
            $rootScope.fecha_nacimiento = data.fecha_nacimiento;
            $rootScope.nombre_provincia = data.nombre_provincia;
            $rootScope.nombre_ciudad = data.nombre_ciudad;
            $rootScope.genero = data.sexo;

            console.log($rootScope.usuario);

            $rootScope.RadioChange = function (s) {
                $scope.generoSelect = s;
            };
        }

        service.getCredentials = function(usuario, clave) {
            return localStorageService.get('usuario');
        }

        //  Verifica si hay información (de usuario) en localStorage
        service.isLoggedIn = function() {
            if (localStorageService.length() > 0) {
                return true;
            } else { return false; }
        }

        service.isEmpty = function(obj) {
            return jQuery.isEmptyObject(obj);
        }
 
        return service;
    }])
 