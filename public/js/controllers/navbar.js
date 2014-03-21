'use strict';

angular.module('classy').controller('NavController', ['$scope', 'Auth', function($scope, Auth) {
    $scope.credentials = {};

    $scope.loginUser = function() {
        $scope.user.username = $scope.credentials.username;
        console.log($scope.credentials);
    };


}]);