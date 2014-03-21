'use strict';

angular.module('classy.system').factory('Auth', ['$http', function($http) {
    return {
        username: '',
        login: function(credentials) {
            return $http.post('/login', credentials);
        },
        logout: function(credentials) {
            return $http.post('/logout', credentials);
        }
    };
}]);