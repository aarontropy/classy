'use strict';
angular.module('classy').controller('MainController', ['$scope', function($scope) {
    $scope.user = window.user;

    $scope.test = function() { console.log('test success'); };
}]);