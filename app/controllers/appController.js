'use strict';

angular.module('InsuControl')
.controller('appController', ['$scope', '$location', 'AuthenticationService', 'localStorageService',
	function($scope, $location, AuthenticationService, localStorageService) {
		
		$scope.init = function() { 
			if (!AuthenticationService.isLoggedIn()) {
		    	$location.path('/login');
		    } else {
		    	var data = AuthenticationService.getCredentials();
		    	AuthenticationService.setCredentials(data);
		    }
		}

		$scope.logout = function() {
			localStorageService.clearAll();
			if (!AuthenticationService.isLoggedIn()) {
				$location.path('/login');
			} else {
				//console.log('SI');
		    	$location.path('/usuarios');
		    }
		}

	 $scope.init();
	}
]);