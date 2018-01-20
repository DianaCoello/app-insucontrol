'use strict';

angular.module('InsuControl')
.directive('sidebar', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			template: '<div ng-include="\'app/views/components/sidebar.html\'"/>'
		}
	}
]);