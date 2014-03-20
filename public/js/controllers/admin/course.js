'use strict';

angular.module('classy.admin').controller('admin.CourseDetailController',
    ['$scope', '$stateParams', 'Courses', 'Semesters',
    function($scope, $stateParams, Courses, Semesters) {
        var cid = $stateParams.courseId;

        $scope.course = Courses.get({id: cid}, function() {
            $scope.semester = Semesters.get({id: $scope.course.semester});
        });

        $scope.save = function() {
            if ($scope.course.$update) { $scope.course.$update(); }
        };

}]);