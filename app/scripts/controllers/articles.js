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
            for(var i = 0; i < data.length; i++) {
                data[i].content = $scope.strip(data[i].content);
            }
            $scope.articles = data;
            console.log($scope.articles);
        },
        function(error) {
            //Handle error
            console.log(error);
        }
    );

    $scope.strip = function(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };
});
