'use strict';

angular.module('InsuControl')
.controller('appController', ['$scope', '$location', 'AuthenticationService', 
	'localStorageService', 'AclService',
	function($scope, $location, AuthenticationService, localStorageService, AclService) {
		
		$scope.init = function() { 
			if (!AuthenticationService.isLoggedIn()) {
		    	$location.path('/login');
		    } else {
		    	var data = AuthenticationService.getCredentials();
		    	AuthenticationService.setCredentials(data);
		    	AclService.roles();
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