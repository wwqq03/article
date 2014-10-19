'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
.controller('ArticlesCtrl', function ($scope, articlesSvc, $window, eventsSvc, $modal) {
    var userRole = $window.sessionStorage.userRole;
    if(userRole === 'admin') {
        $scope.isAdmin = true;
    }
    $scope.selectedArticles = [];

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
    };

    $scope.compose = function() {
        if($scope.selectedArticles.length < 2) {
            $window.alert('Du må velge i minst to artikler for å slå sammen');
            return;
        }
        var modalInstance = $modal.open({
            templateUrl: 'eventName.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm'
        });

        modalInstance.result.then(function(eventName) {
            var newEvent = {
                name: eventName,
                articles: $scope.selectedArticles
            };
            eventsSvc.create(newEvent)
            .then(
                function() {$window.location.href = '#/events'},
                function(err) {$window.alert(err.message);}
            );
        }, function() {

        });
    }
})
.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close($scope.eventName);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
