'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
.controller('LoginCtrl', function ($scope, $rootScope, settings, $http, $window) {
    $scope.login = function() {
        delete $scope.error;
        $http.post(settings.server_address + '/auth', $scope.form)
        .success(function(data) {
            $window.sessionStorage.token = data.token;
            $rootScope.user = data.profile;
            $window.location.href = '#/articles';
        })
        .error(function(data, status) {
            $scope.error = data;
        });
    };
});
