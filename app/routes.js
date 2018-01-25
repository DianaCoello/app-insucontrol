'use strict';

angular.module('InsuControl')
.config(['$routeProvider',
	function($routeProvider) {
		
		$routeProvider
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'loginController'
		}) 

		.when('/perfil', {
			templateUrl: 'app/views/pages/perfil.html',
			controller: 'perfilController',
		/*	resolve : {
		        'acl' : ['$q', 'AclService', function($q, AclService){
		        	if(AclService.can('perfil')){
		        		return true;
		          	} else { 
		            	console.log("hola");

		            	return $q.reject('Unauthorized');
		          	}
		        }]
		    }*/
		})

		.when('/usuarios', {
			templateUrl: 'app/views/pages/usuarios.html',
			controller: 'usuariosController',
			resolve : {
		        'acl' : ['$q', 'AclService', function($q, AclService){
		        	if (AclService.can('usuarios')) {
		            	return true;
		          	} else {
		            	return $q.reject('Unauthorized');
		          	}
		        }]
		    }
		})

		.when('/alimentos', {
			templateUrl: 'app/views/pages/alimentos.html',
			controller: 'alimentosController',
			resolve : {
		        'acl' : ['$q', 'AclService', function($q, AclService){
		        	if (AclService.can('alimentos')) {
		            	return true;
		          	} else {
		            	return $q.reject('Unauthorized');
		          	}
		        }]
		    }
		}) 

		.when('/mapa', {
			templateUrl: 'app/views/pages/mapa.html',
			controller: 'mapaController',
			resolve : {
		        'acl' : ['$q', 'AclService', function($q, AclService){
		        	if (AclService.can('mapa')) {
		            	return true;
		          	} else {
		            	return $q.reject('Unauthorized');
		          	}
		        }]
		    }
		}) 
        
        .when('/historial', {
			templateUrl: 'app/views/pages/historial.html',
			controller: 'historialController',
			resolve : {
		        'acl' : ['$q', 'AclService', function($q, AclService){
		        	if (AclService.can('historial')) {
		            	return true;
		          	} else {
		            	return $q.reject('Unauthorized');
		          	}
		        }]
		    }
		})

		.when('/404', {
			templateUrl: 'app/views/pages/page_404.html'
		})
		
		.otherwise({ redirectTo: '/404' });
	}
]);

angular.module('InsuControl')
.run(['$rootScope', '$location', function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(current, previous, rejection){
    	if(rejection === 'Unauthorized'){
      		$location.path('/perfil');
    	}
  	})
}]);