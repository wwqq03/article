'use strict';
angular.module('articleControllers', []);
angular.module('articleServices', []);
var app = angular.module('articleApp', ['articleServices', 'articleControllers','ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
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
