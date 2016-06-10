var app = angular.module('main-controller', []);
app.controller("main-controller", function($scope, Page) {
   $scope.Page = Page; 
   Page.setTitle('Home');
   $scope.index = true;
   
});