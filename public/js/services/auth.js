'use strict';

angular.module('classy').factory('Auth', ['$http', function($http) {
    var user = {
        username: null,
    };
    
    var getUser = function() {
        $http.get('/users/me').success(function(data) { //args: data, status, headers, config
            user = data;
        });
    };

    var loginSuccess = function(res) { user.username = res.data.username; }
    var loginError = function(res) { user.username = null; }

    var login = function(credentials) {
        var p = $http.post('/login', credentials);
        p.then(loginSuccess, loginError);
        return p;
    };

    var logout = function() {
        var p = $http.post('/logout', {});
        p.then(loginError, loginError);
        return p;
    };

    return {
        user: user,
        login: login,
        logout: logout
    };

}]);