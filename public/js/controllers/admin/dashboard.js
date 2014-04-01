'use strict';

angular.module('classy.admin')
.controller('admin.DashboardController', ['$scope', 'Semesters', function($scope, Semesters) {
    $scope.semesters = null;

    $scope.semesterDetailUrl = function(id) {
        return '/semesters/' + id;
    };

    $scope.addSemester = function() {
        Semesters.save({title: 'New Semester'});
        $scope.find();
    };

    $scope.activateSemesterClass = function(active) {
        if (active) return 'glyphicon glyphicon-star';
        else return 'glyphicon glyphicon-star-empty';
    };

    $scope.activateSemester = function(id) {
        console.log('Activate!');
    };

    $scope.find = function() {
        Semesters.query(function(semesters) {
            $scope.semesters = semesters;
        });
    };

    $scope.find();
}]);