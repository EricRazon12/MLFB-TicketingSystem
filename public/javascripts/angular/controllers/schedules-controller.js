var app = angular.module('schedules-controller', []);
app.controller("schedules-controller", function($scope, Page, schedulefactory) {
   Page.setTitle('Game Schedules'); 
   $scope.schedule = {
       selected: {
           team1: '',
           team2: '',
           stadium: ''
       },
       static: {
           week: '',
           date: '',
           time: ''
       }
   };
   $scope.getSchedules = function () {
       schedulefactory.requestSchedules()
       .success(function (data) {
        console.log(data);
        $scope.schedules = data;
       })
       .error(function (error) {
           
       })
   }
   
   $scope.AddSchedule = function () {
       if($scope.schedule.selected.team1 && $scope.schedule.selected.team2 && $scope.schedule.selected.stadium
       && $scope.schedule.static.week && $scope.schedule.static.date && $scope.schedule.static.time)
       {
            schedulefactory.addSchedule($scope.schedule)
            .success(function (data) {
                    console.log(data);
                    $scope.schedules = data;
            })
            .error(function (error) {
                
            }) 
        }
   }
   
});