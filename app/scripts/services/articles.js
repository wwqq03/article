'use strict';

/**
 * @ngdoc service
 * @name articleApp.articles
 * @description
 * # articles
 * Service in the articleApp.
 */
angular.module('articleServices')
.service('articlesSvc', function($resource, $q, settings) {
    var d;
    var Articles = $resource(settings.server_address + '/api/articles');
    var cache = [];

    var getAllArticles = function() {
        d = $q.defer();

        var strip = function(html) {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        };

        var succ = function(result) {
            angular.forEach(result, function(article) {
                if(!cache[article._id]) {
                    article.content = strip(article.content);
                    cache.push(article);
                    //easier to look-up
                    cache[article._id] = article;
                }
            });
            d.resolve(cache);
        };
        var fail = function(reason) {
            d.reject(reason);
        };
        Articles.query(succ, fail);
    };

    return {
        get: function() {
            if(cache.length < 1) {
                getAllArticles();
            }
            return d.promise;
        }
    };
});
