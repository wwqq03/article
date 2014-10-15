'use strict';
angular.module('articleControllers', []);
var app = angular.module('articleApp', ['articleControllers','ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/articles', {
      templateUrl: 'views/articles.html',
      controller: 'ArticlesCtrl'
    })
    .when('/events', {
      templateUrl: 'views/events.html',
      controller: 'EventsCtrl'
    })
    .otherwise({
      redirectTo: '/articles'
    });
});
