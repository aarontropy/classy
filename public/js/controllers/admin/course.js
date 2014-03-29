'use strict';

angular.module('classy.admin').controller('admin.CourseDetailController',
    ['$scope', '$stateParams', 'Courses', 'Semesters',
    function($scope, $stateParams, Courses, Semesters) {
        var cid = $stateParams.courseId;

        $scope.course = Courses.get({id: cid}, function() {
            console.log($scope.course);
            $scope.semester = Semesters.get({id: $scope.course.semester});
        });

        $scope.save = function() {
            console.log('saving', $scope.course);
            if ($scope.course.$update) {
                $scope.course.$update();
            }
        };

        // ==== FULLCALENDAR SETUP =============================================
        $scope.eventSource = {
            url: '/courses/' + cid + '/meetings'
        };
        $scope.eventSources = [$scope.eventSource];

        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                }
            }
        };

}]);