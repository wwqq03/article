'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
.controller('ArticlesCtrl', function ($scope, articlesSvc, $window) {
    var userRole = $window.sessionStorage.userRole;
    if(userRole === 'admin') {
        $scope.isAdmin = true;
    }
    articlesSvc.get()
    .then(
        function(data) {
            $scope.articles = data;
            console.log($scope.articles);
        },
        function(error) {
            //Handle error
            console.log(error);
        }
    );
});
