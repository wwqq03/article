'use strict';

/**
 * @ngdoc function
 * @name articleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the articleApp
 */
angular.module('articleControllers')
  .controller('NewsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
