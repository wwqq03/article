'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the articleApp
 */
angular.module('articleApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
