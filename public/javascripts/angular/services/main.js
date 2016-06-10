var baseURL = "/api/";

var app = angular.module('main-service', []);
app.factory('mainfactory', function ($http, $cacheFactory) {
   return {
        requestAppLocation: function(username){
            return $http({
                        method: 'POST',
                        url: baseURL + 'teams/add',
                        params: {
                            username: username
                        }
                        
                    });
        }
     }
});