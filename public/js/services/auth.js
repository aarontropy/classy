'use strict';

angular.module('classy').factory('Auth', ['$http', function($http) {
    var user = {
        username: null,
    };
    
    var getUser = function() {
        $http.get('/users/me').success(function(data) { //args: data, status, headers, config
            loadUser(data);
        });
    };

    var loadUser = function(data) {
        user.username = data.username;
    };

    var loginSuccess = function(res) { loadUser(res.data); }
    var loginError = function(res) { loadUser({}); }

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

    getUser();

    return {
        user: user,
        login: login,
        logout: logout
    };

}]);