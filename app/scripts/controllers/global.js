'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
.controller('GlobalCtrl', function ($scope, $rootScope, $window) {
    if($window.sessionStorage.token) {
        $scope.isLoggedIn = true;
    }

    $rootScope.$on('loggedIn', function() {
        $scope.isLoggedIn = true;
    });

    $scope.logout = function() {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.userRole;
        $scope.isLoggedIn = false;
        $window.location.href = '#/login'
    };
});
