'use strict';

//Articles service used for articles REST endpoint
angular.module('classy.system').factory('Semesters', ['$resource', function($resource) {
    return $resource('semesters/:semesterId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);