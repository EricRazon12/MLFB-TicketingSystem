var app = angular.module('account-controller', ['account-service']);
app.controller('account-controller', function ($scope, accountfactory, $window) {
    $scope.logout = function () {
       accountfactory.requestLogout()
        .success(function(data, status){
            if(status == 200){
                $window.location.href = '/account/login';
            }
        })
        .error(function(error, status){
            
        })
    }

})