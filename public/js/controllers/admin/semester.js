'use strict';

angular.module('classy.admin').controller('admin.SemesterDetailController', 
    ['$scope', '$stateParams', '$resource',
    function($scope, $stateParams, $resource) {
        $scope.semester = {};

        var semesters = $resource('/semesters/:id', 
            {id: '@_id'}, 
            {update: {method: 'PUT'}}
        );

        $scope.semester = semesters.get({id: $stateParams.semesterId});
        console.log($scope.semester);

}]);