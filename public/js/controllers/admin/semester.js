'use strict';

angular.module('classy.admin').controller('admin.SemesterDetailController',
    ['$scope', '$stateParams', '$state', 'Semesters',
    function($scope, $stateParams, $state, Semesters) {
        var sid = $stateParams.semesterId;

        $scope.semester = Semesters.get({id: sid});
        $scope.courses = Semesters.getCourses(sid);

        $scope.save = function() {
            console.log('saving: ', $scope.semester);
            if ($scope.semester.$update) {
                $scope.semester.$update();
            }
        };

        $scope.addCourse = function() {
            Semesters.addCourse({title: 'New Course', semester: sid}, function() {
                $scope.courses = Semesters.getCourses(sid);
            });

        };

        $scope.goCourseDetail = function(id) {
            $state.go('course-detail', {courseId: id});
        };

        // ==== TINYMCE CONFIGURATION ==========================================
        $scope.descriptionOptions = {};

}]);