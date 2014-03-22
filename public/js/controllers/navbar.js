'use strict';

angular.module('classy')
.controller('NavController', ['$scope', '$window', 'Auth', function($scope, $window, Auth) {
    $scope.credentials = {};

    $scope.loginUser = function() {
        Auth.login($scope.credentials)
        .success(function(data, status,headers,config) {
            $scope.user = data;
        })
        .error(function(data, status, headers, config) {
            $scope.user = {};
            console.log('Error: ', data.error);
        });
    };

    $scope.logoutUser = function() {
        Auth.logout().success(function(data, status, headers, config) {
            $scope.user = {};
            $window.location.href = data.redirect || '/';
        });
    };


}]);