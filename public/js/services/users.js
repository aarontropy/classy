'use strict';

angular.module('classy').factory('Users', ['$resource', function($resource) {
    return $resource('/users/:userId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);