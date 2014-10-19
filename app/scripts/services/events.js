'use strict';

/**
 * @ngdoc service
 * @name articleApp.events
 * @description
 * # events
 * Service in the articleApp.
 */
angular.module('articleServices')
.service('eventsSvc', function($resource, $q, settings) {
    var d;
    var Event = $resource(settings.server_address + '/api/events/:id',
            {id: '@_id'}
        );
    var cache = [];

    var getAllEvents = function() {
        d = $q.defer();

        var succ = function(result) {
            angular.forEach(result, function(event) {
                if(!cache[event._id]) {
                    cache.push(event);
                    //easier to look-up
                    cache[event._id] = event;
                }
            });
            d.resolve(cache);
        };
        var fail = function(reason) {
            d.reject(reason);
        };
        Event.query(succ, fail);
    };

    return {
        get: function() {
            if(cache.length < 1) {
                getAllEvents();
            }
            return d.promise;
        },

        create: function(event) {
            var defer = $q.defer();
            if(!event || !event.name || !event.articles) {
                defer.reject('Invalid event object');
            } else {
                var item = new Event();
                item.name = event.name;
                item.articles = event.articles;
                item.$save(
                    function(data) {
                        cache.push(data);
                        //easier to look-up
                        cache[data._id] = data;
                        defer.resolve(null);
                    },
                    function(err) {
                        defer.reject(err);
                    }
                );
            }
            return defer.promise;
        }
    };
});
