'use strict';

angular.module('InsuControl')
.directive('menu', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			template: '<div ng-include="\'app/views/components/menu.html\'"/>'
		}
	}
]);