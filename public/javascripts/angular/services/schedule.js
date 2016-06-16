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
        },
        addSchedule: function (data) {
            return $http({
                        method: 'POST',
                        url: baseURL + scheduleURL + 'add',
                        params: {
                            sched: JSON.stringify(data)
                            // week: data.week,
                            // datetime: data.datetime,
                            // team1: JSON.stringify(data.selected.team1),
                            // team2: JSON.stringify(data.selected.team2),
                            // stadium: JSON.stringify(data.selected.stadium)
                        }
                    });
        }
     }
});