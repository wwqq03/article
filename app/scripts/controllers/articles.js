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
    $scope.selectedArticles = [];

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

    $scope.changeSelectedArticles = function(articleId) {
        if(!articleId) {
            return;
        }
        var index = _.indexOf($scope.selectedArticles, articleId)
        if(index > -1) {
            //If the article is already in array, this is a unselect action
            $scope.selectedArticles.splice(index, 1);
        } else {
            //article is not in array, this is a select action
            $scope.selectedArticles.push(articleId);
        }
    }
});
