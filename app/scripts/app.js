'use strict';
angular.module('articleControllers', []);
angular.module('articleServices', []);
var app = angular.module('articleApp', ['articleServices', 'articleControllers','ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap']);

app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        $window.location.href = '#/login';
      }
      return response || $q.when(response);
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

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
      redirectTo: '/login'
    });
}).
run(function($rootScope, $location) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if(!$rootScope.user) {
      // no logged user, redirect to /login
      if(next.templateUrl !== "views/login.html") {
        $location.path("/login");
      }
    }
  });
});
