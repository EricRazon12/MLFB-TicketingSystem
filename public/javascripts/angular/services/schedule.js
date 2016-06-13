var baseURL = "/api/";
var scheduleURL = 'schedule/';
var app = angular.module('schedule-service', []);
app.factory('schedulefactory', function ($http, $cacheFactory) {
   return {
        requestSchedules: function(){
            return $http({
                        method: 'GET',
                        url: baseURL + scheduleURL
                    });
        }
     }
});