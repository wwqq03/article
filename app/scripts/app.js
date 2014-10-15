'use strict';
var controllers = angular.module('articleControllers', []);
var app = angular.module('articleApp', ['articleControllers','ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/news', {
      templateUrl: 'views/news.html',
      controller: 'MainCtrl'
    })
    .when('/events', {
      templateUrl: 'views/events.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/news'
    });
});
