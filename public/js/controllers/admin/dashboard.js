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

    $scope.visibleSemesterClass = function(visible) {
        if (visible) return 'glyphicon glyphicon-eye-open';
        else return 'glyphicon glyphicon-eye-close';
    };

    $scope.toggleVisible = function(semester) {
        semester.visible = !semester.visible;
        semester.$update();
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