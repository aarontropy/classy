'use strict';
angular.module('classy').controller('MainController', ['$scope', function($scope) {
    $scope.user = {};

    $scope.test = function() { console.log("test success"); };
}]);