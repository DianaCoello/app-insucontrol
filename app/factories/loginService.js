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

            $rootScope.fecha_nacimiento = new Date(data.fecha_nacimiento);
           // $rootScope.fecha_nacimiento.getTimezoneOffset();
            $rootScope.fecha_nacimiento.setMinutes 
                ($rootScope.fecha_nacimiento.getMinutes () + 
                $rootScope.fecha_nacimiento.getTimezoneOffset ());
            $rootScope.genero = data.sexo;
            $rootScope.RadioChange = function (s) {
                $rootScope.generoSelect = s;
            };

            $rootScope.miProvincia = {
                id_provincia: data.id_provincia,
                nombre: data.nombre_provincia
            }

            $rootScope.miCiudad = {
                id_ciudad: data.id_ciudad,
                nombre_ciudad: data.nombre_ciudad
              }
            console.log($rootScope.fecha_nacimiento);
        }

        service.getCredentials = function(usuario, clave) {
            return localStorageService.get('usuario');
        }

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
 