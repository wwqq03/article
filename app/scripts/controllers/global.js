'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
.controller('GlobalCtrl', function ($scope, $window) {
    $scope.logout = function() {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.userRole;
        $window.location.href = '#/login'
    };
});
