'use strict';

// ==== SEMESTERS ==============================================================

angular.module('classy').factory('Semesters', ['$resource', function($resource) {
    var semesters =  $resource('/api/semesters/:id',
        { id: '@_id' },
        { update: {method: 'PUT'}}
    );

    semesters.getCourses = function(id, cb) {
        return $resource('/api/semesters/:id/courses').query({id: id}, cb);
    };

    semesters.addCourse = function(course, cb) {
        return $resource('/api/courses').save(course, cb);
    };


    return semesters;
}]);

// ==== COURSES ================================================================

angular.module('classy').factory('Courses', ['$resource', function($resource) {
    var courses =  $resource('/api/courses/:id',
        { id: '@_id' },
        { update: {method: 'PUT'}}
    );

    courses.meetings = function(id, cb) {
        return $resource('/api/courses/:id/meetings').query({id:id}, cb);
    };

    return courses;
}]);


// ==== USERS ==================================================================

angular.module('classy').factory('Users', ['$resource', function($resource) {
    var users = $resource('/api/users/:userId',
        { userId: '@_id' },
        { update: { method: 'PUT'}}
    );

    return users;
}]);