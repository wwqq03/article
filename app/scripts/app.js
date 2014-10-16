'use strict';
angular.module('articleControllers', []);
var app = angular.module('articleApp', ['articleControllers','ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
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
