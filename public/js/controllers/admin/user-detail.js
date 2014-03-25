// User-Detail Controller
'use strict';

angular.module('classy.admin')
.controller('admin.UserDetailController', ['$scope', '$stateParams', '$state', 'Users', function($scope, $stateParams, $state, Users) {
    var uid = $stateParams.id;
    $scope.user = Users.get({userId: uid});

    $scope.save = function() {
        console.log("saving: ", $scope.user);
        if ($scope.user.$update) {
            $scope.user.$update();
        }
    };

    // ==== SELECT2 CONFIGURATION ==============================================
    $scope.rolesOptions = {
        multiple: true,
        simple_tags: true,
        tage: ['One', 'Two', 'Three']
    };
}]);