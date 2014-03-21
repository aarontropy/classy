'use strict';

angular.module('classy').controller('NavController', ['$scope', 'Auth', function($scope, Auth) {
    $scope.credentials = {};

    $scope.loginUser = function() {
        Auth.login($scope.credentials)
        .success(function(data, status,headers,config) {
            console.log('data', data);
            console.log('status', status);
            console.log('headers', headers);
            console.log('config', config);
        })
        .error(function(data, status, headers, config) {
            console.log('data', data);
            console.log('status', status);
            console.log('headers', headers);
            console.log('config', config);
        });
    };


}]);