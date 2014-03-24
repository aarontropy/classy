'use strict';
angular.module('classy').controller('MainController', ['$scope', '$window', function($scope, $window) {
    $scope.user = {};
    $scope.user = $window.user;

    $scope.test = function() { console.log('test success'); };
}]);