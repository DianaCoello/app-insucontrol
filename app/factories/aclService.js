'use strict';
 
angular.module('InsuControl')
.run(['AclService', 'AuthenticationService', 
    function (AclService, AuthenticationService) { 

        AclService.addRole('paciente');
        AclService.addRole('medicos');
        AclService.addRole('admin');

        AclService.addResource('perfil');
        AclService.addResource('alimentos');
        AclService.addResource('usuarios');
        AclService.addResource('historial');
        AclService.addResource('mapa');
     
        AclService.allow('admin', 'perfil');
        AclService.allow('admin', 'usuarios');
        AclService.allow('admin', 'alimentos');
        AclService.allow('admin', 'historial');
        AclService.allow('admin', 'mapa');

        AclService.allow('paciente', 'perfil');
        AclService.allow('paciente', 'alimentos');
        AclService.allow('paciente', 'historial');

        AclService.allow('medicos', 'perfil');
        AclService.allow('medicos', 'alimentos');
        AclService.allow('medicos', 'usuarios');
        AclService.allow('medicos', 'historial');

       
        AclService.roles = function(){
            var data = AuthenticationService.getCredentials();
            AuthenticationService.setCredentials(data);
            var user = {
                getRoles: function () {
                    return [data.descripcion];
                },
            };
            AclService.setUserIdentity(user);
            console.log(user);

        }         
    }]);



