'use strict';

// ==== SEMESTERS ==============================================================

angular.module('classy').factory('Semesters', ['$resource', function($resource) {
    var semesters =  $resource('/semesters/:id', 
        { id: '@_id' },
        { update: {method: 'PUT'}}
    );

    semesters.getCourses = function(id, cb) {
        return $resource('/semesters/:id/courses').query({id: id}, cb);
    };

    semesters.addCourse = function(course, cb) {
        return $resource('/courses').save(course, cb);
    };


    return semesters;
}]);

// ==== COURSES ================================================================

angular.module('classy').factory('Courses', ['$resource', function($resource) {
    var courses =  $resource('/courses/:id', 
        { id: '@_id' },
        { update: {method: 'PUT'}}
    );

    return courses;
}]);


// ==== USERS ==================================================================

angular.module('classy').factory('Users', ['$resource', function($resource) {
    var users = $resource('/users/:userId', 
        { userId: '@_id' },
        { update: { method: 'PUT'}}
    );

    return users;
}]);