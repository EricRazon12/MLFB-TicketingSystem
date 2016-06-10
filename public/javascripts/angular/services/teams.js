var baseURL = "/api/";
var teamUrl = "teams/";

var app = angular.module('team-service', []);
app.factory('teamfactory', function ($http, $cacheFactory) {
   return {
        requestTeams: function(){
            return $http({
                        method: 'GET',
                        url: baseURL + teamUrl,
                        cache: true
                    });
        },
        
        requestOneTeam: function(_id, isadmin){
            return $http({
                        method: 'GET',
                        url: baseURL + teamUrl + _id,
                        params:{
                            isadmin: isadmin
                        }
                    });
        },

        requestStadiums: function () {
            return $http({
                method: 'GET',
                url: baseURL + teamUrl + 'stadiums',
                cache: true
            });
        },
        
        deleteTeam: function (_id) {
            return $http({
                method: 'DELETE',
                url: baseURL + teamUrl + 'delete',
                params:{
                    _id: _id
                }
            });
        }
     }
});