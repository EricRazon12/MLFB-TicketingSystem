var app = angular.module('main-controller', []);
app.controller("main-controller", function($scope, Page, $timeout) {
   $scope.Page = Page; 
   $scope.index = true;
    $timeout(function () {
        Page.setTitle('Home');
    });
});