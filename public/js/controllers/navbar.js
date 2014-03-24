'use strict';

angular.module('classy')
.controller('NavController', ['$scope', '$window', 'Auth', function($scope, $window, Auth) {
    $scope.credentials = {};
    $scope.user = Auth.user;

    $scope.loginUser = function() {
        Auth.login($scope.credentials)
        .success(function(data, status,headers,config) {
        })
        .error(function(data, status, headers, config) {
        });
    };

    $scope.logoutUser = function() {
        Auth.logout().success(function(data, status, headers, config) {
            $scope.user = {};
            $window.location.href = data.redirect || '/';
        });
    };

    $scope.test = function() {
        console.log('SCope: ', $scope.user);
        console.log('Auth: ', Auth.user);
    };


}]);