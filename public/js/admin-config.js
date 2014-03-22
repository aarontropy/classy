'use strict';

angular.module('classy.admin').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // for unmatched routes:
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('dashboard', {
        url: '/',
        templateUrl: '/views/admin/dashboard.html'
    });
}]);