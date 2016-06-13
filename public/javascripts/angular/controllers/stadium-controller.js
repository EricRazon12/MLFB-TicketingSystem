var app = angular.module('stadium-controller', []);
app.controller("stadium-controller", function($scope, Page, teamfactory) {
   Page.setTitle('Stadium'); 
      $scope.getStadiums = function () {
       teamfactory.requestStadiums()
       .success(function (data) {
           $scope.stadiums = data;
            console.log($scope.stadiums);
       })
       .error(function (data) {

       });
   }
});