var app = angular.module('schedules-controller', []);
app.controller("schedules-controller", function($scope, Page, schedulefactory, socket) {
   Page.setTitle('Game Schedules'); 
   
   // *** socket.io will 
   socket.on('update-schedules', function (data) {
       $scope.schedule.list.push(data);
   })
   
   socket.on('user disconnected', function () {
       //alert('disconnected');
   })
   
   
   $scope.schedule = {
       list: '',
       selected: {
           team1: '',
           team2: '',
           stadium: ''
       },
       static: {
           _id: '',
           week: '',
           date: '',
           time: ''
       }
   };
   $scope.getSchedules = function () {
       schedulefactory.requestSchedules()
       .success(function (data) {
        console.log(data);
        $scope.schedule.list = data;
       })
       .error(function (error) {
           
       })
   }
   
   $scope.AddSchedule = function () {
    //    socket.emit("update-schedules");
       if($scope.schedule.selected.team1 && $scope.schedule.selected.team2 && $scope.schedule.selected.stadium
       && $scope.schedule.static.week && $scope.schedule.static.date && $scope.schedule.static.time)
       {
           var static = $scope.schedule.static;
           var stadium = $scope.schedule.selected.stadium;
           var team1 = $scope.schedule.selected.team1;
           var team2 = $scope.schedule.selected.team2;
           var sched = {
                    datetime: static.date + ' ' + static.time,
                    stadium:{
                        capacity: stadium.capacity,
                        image: stadium.image,
                        location: stadium.location,
                        name: stadium.name
                    },
                    teams:[
                        {
                        imgurl: team1.imgurl,
                        name: team1.name,
                        nickname: team1.nickname,
                        stadium:{
                            capacity: team1.capacity,
                            image: team1.image,
                            location: team1.location,
                            name: team1.name}
                        },
                        {
                        imgurl: team2.imgurl,
                        name: team2.name,
                        nickname: team2.nickname,
                        stadium:{
                            capacity: team2.capacity,
                            image: team2.image,
                            location: team2.location,
                            name: team2.name}
                        }
                    ],
                    week: static.week
                    }
           
            schedulefactory.addSchedule(sched)
            .success(function (data) {
                    $scope.schedule.static._id = data;
                    sched._id = data;
                    socket.emit("update-schedules", sched);
            })
            .error(function (error) {
                
            }) 
        }
   }
   
});