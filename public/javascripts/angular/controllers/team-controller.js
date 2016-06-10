var app = angular.module('team-controller', ['ngFileUpload', 'ticketing-filter']);
app.controller("team-controller", function($scope, Page, teamfactory, Upload, $timeout, $window, $routeParams, $filter) {

   Page.setTitle('Teams'); 
   
   $scope.getTeams = function () {

       teamfactory.requestTeams()
       .success(function (data, status) {
           $scope.teams = data;
       })
       .error(function (error, status) {
           console.log(error);
       });
   }
   
   $scope.getOneTeam = function () {
       $scope.isadmin = ($routeParams.isadmin === "true");
       $scope._id = $routeParams._id;
       if($scope._id != '0'){
            teamfactory.requestOneTeam($routeParams._id, $scope.isadmin)
            .success(function (data, status) {
                $scope.team = data;
                $(".disp1").attr("src", $scope.team.imgurl);
                $(".disp2").attr("src", $scope.team.stadium.image);
                //console.log(data);
            })
            .error(function (error, status) {
                console.log(error);
                $window.location.href = '/account/login'  // '/teams/view/' + $routeParams._id + '/false';
            });
       }else{
       }
   }
   
   $scope.getStadiums = function () {
       teamfactory.requestStadiums()
       .success(function (data) {
           $scope.stadiums = data;
       })
       .error(function (data) {

       });
   }
   
      $scope.AddTeam = function(file, file2) {
        Upload.upload({
            url: '/api/teams/add',
            data: {logo: file, stadium: file2},
            params: {
                name: $scope.team.name,
                nickname: $scope.team.nickname,
                sname: $scope.team.stadium.name,
                slocation: $scope.team.stadium.location,
                scapacity: $scope.team.stadium.capacity
            }
        }).then(function (response) {
            if(response.status == 200){
                $timeout(function () {
                    $window.location.href = '/account/dashboard/';
                });
            }else{
                alert('error');
            }
        });
    }
    
    $scope.UpdateTeam = function(file, file2) {
        Upload.upload({
            url: '/api/teams/update',
            data: {logo: file, stadium: file2},
            params: {
                name: $scope.team.name,
                nickname: $scope.team.nickname,
                sname: $scope.team.stadium.name,
                slocation: $scope.team.stadium.location,
                scapacity: $scope.team.stadium.capacity,
                _id: $scope.team._id
            }
        }).then(function (response) {
            if(response.status == 200){
                $timeout(function () {
                    $window.location.href = '/account/dashboard/';
                });
            }else{
                alert('error');
            }
        });
    }
    
    $scope.RemoveTeam = function(_id) {
        if(confirm("Do you")){
            teamfactory.deleteTeam(_id)
                .success(function (data) {
                    $window.location.href = '/account/dashboard/';
                })
                .error(function (data) {

                });
            
        }else{
            alert('abort');
        }
    }
    
   $(document).on("change", "input[type=file]#upload1", function(){
        setTimeout(function(){
             $("img.disp1").attr("src", $("img.disp1a").attr("src"));
             //$scope.team.imgurl = "show";
        },50)
    })
    
    $(document).on("change", "input[type=file]#upload2", function(){
        setTimeout(function(){
             $("img.disp2").attr("src", $("img.disp2a").attr("src"));
             console.log($scope.team.stadium.image);
        },50)
    })
   
});