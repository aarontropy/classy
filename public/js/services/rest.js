angular.module('classy').factory('SimpleRest', ['$resource', function($resource) {
    return function(resource) {
        return $resource('/' + resource + '/:id', { id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }
}]);