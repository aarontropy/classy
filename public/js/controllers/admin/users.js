'user strict';

angular.module('classy.admin').controller('admin.UsersController', ['$scope', 'Users', function($scope, Users) {
    $scope.users = null;

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });
    };

    $scope.find();
}])