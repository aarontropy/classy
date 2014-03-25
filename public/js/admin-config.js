'use strict';

angular.module('classy.admin').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // for unmatched routes:
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('dashboard', {
        url: '/',
        templateUrl: '/views/admin/dashboard.html'
    })
    .state('users', {
        url: '/users',
        templateUrl: '/views/admin/users.html'
    })
    .state('user-detail', {
        url: '/users/:id',
        templateUrl: '/views/admin/user-detail.html'
    })
    .state('semester-detail', {
        url: '/semesters/:semesterId',
        templateUrl: '/views/admin/semester-detail.html'
    })
    .state('course-detail', {
        url: '/courses/:courseId',
        templateUrl: '/views/admin/course-detail.html'
    });
}]);