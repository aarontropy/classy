'use strict';

angular.module('classy').factory('Semesters', ['$resource', function($resource) {
    return $resource('/semesters/:semesterId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);