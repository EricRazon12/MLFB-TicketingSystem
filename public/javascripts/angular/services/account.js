var accountUrl = "/account/";

var app = angular.module('account-service', []);
app.factory('accountfactory', function ($http, $cacheFactory) {
   return {
        requestLogout: function(){
            return $http({
                        method: 'POST',
                        url:  accountUrl + 'logout'
                    });
        }
   }
});