'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
.controller('EventsCtrl', function ($scope, $window, $q, eventsSvc, articlesSvc) {
    var userRole = $window.sessionStorage.userRole;
    if(userRole === 'admin') {
        $scope.isAdmin = true;
    }

    $q.all([
        eventsSvc.get(),
        articlesSvc.get()
    ]).then(
        function(data) {
            $scope.articles = data[1];
            $scope.events = data[0];
        },
        function(err) {console.log(err);}
    );

    $scope.loadSlides = function(event) {
        event.slides = [];
        angular.forEach(event.articles, function(articleId) {
            event.slides.push(
                {
                    image: $scope.articles[articleId].imgUrl
                }
            );
        });
    };
});
