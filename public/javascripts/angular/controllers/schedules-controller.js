var app = angular.module('schedules-controller', []);
app.controller("schedules-controller", function($scope, Page, schedulefactory) {
   Page.setTitle('Game Schedules'); 
   
   $scope.getSchedules = function () {
       schedulefactory.requestSchedules()
       .success(function (data) {
        console.log(data);
        $scope.schedules = data;
       })
       .error(function (error) {
           
       })
   }
   
});