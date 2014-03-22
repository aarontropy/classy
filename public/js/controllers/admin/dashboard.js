'use strict';

angular.module('classy.admin')
.controller('admin.DashboardController', ['$scope', 'Semesters', function($scope, Semesters) {
    $scope.semesters = null;

    $scope.find = function() {
        Semesters.query(function(semesters) {
            $scope.semesters = semesters;
        });
    };

    $scope.find();
}]);