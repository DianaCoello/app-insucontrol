'use strict';

angular.module('InsuControl')
.controller('appController', ['$scope', '$location', 'AuthenticationService', 
	'localStorageService',
	function($scope, $location, AuthenticationService, localStorageService) {
		
		$scope.init = function() { 
			if (!AuthenticationService.isLoggedIn()) {
		    	$location.path('/login');
		    } else {
                try{
                    var data = AuthenticationService.getCredentials();
		    	AuthenticationService.setCredentials(data);
                var opc = AuthenticationService.getOpciones();
                AuthenticationService.setOpciones(opc);
                } catch(err){
                    $scope.logout();
                }
		    	
		    }
		}

		$scope.logout = function() {
			localStorageService.clearAll();
			if (!AuthenticationService.isLoggedIn()) {
				$location.path('/login');
			} else {
		    	$location.path('/perfil');
		    }
		}

	 $scope.init();
	}
]);