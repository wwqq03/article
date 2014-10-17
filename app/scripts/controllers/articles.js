'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
.controller('ArticlesCtrl', function ($scope, articlesSvc) {
    articlesSvc.get()
    .then(
        function(data) {
            $scope.articles = data;
        },
        function(error) {
            //Handle error
            console.log(error);
        }
    );
});
