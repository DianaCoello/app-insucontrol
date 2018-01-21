'use strict';

angular.module('InsuControl')
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colors: ['#FF5252', '#FF8A80']
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }])
.controller('historialController', ['$scope', '$rootScope', '$location', 'localStorageService', 
	 function($scope, $rootScope, $location, localStorageService, MapaService) {

		$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];

	}
]);