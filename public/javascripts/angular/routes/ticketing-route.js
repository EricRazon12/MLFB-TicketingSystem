var app = angular.module('ticketing-route', ['ngRoute']);
app.config(function($routeProvider, $locationProvider){
	$routeProvider
	
	//Clients Routes
	.when('/', {templateUrl: '/client/partials/index.html', controller: 'main-controller'})
	.when('/teams', {templateUrl: '/client/partials/teams.html', controller: 'team-controller'})
	.when('/game-schedules', {templateUrl: '/client/partials/game-schedules.html', controller: 'schedules-controller'})
	.when('/venues', {templateUrl: '/client/partials/venues.html', controller: 'stadium-controller'})
	.when('/venues/stadium', { templateUrl: '/client/partials/stadium.html', controller: 'stadium-controller' })
	.when('/faq', {templateUrl: '/client/partials/faq.html', controller: 'faq-controller'})
	.when('/teams/view/:_id/:isadmin', {templateUrl: '/administrator/partials/view-team.html', controller: 'team-controller'})

  
    //Administrator
	.when('/account/*', {templateUrl: '/administrator/partials/view-all-team.html', controller: 'team-controller'})
    .when('/account/dashboard/', {templateUrl: '/administrator/partials/view-all-team.html', controller: 'team-controller'})
	.when('/account/dashboard/teams/:_id/:isadmin', {templateUrl: '/administrator/partials/add-team.html', controller: 'team-controller'})
	//.when('/account/dashboard/teams/:action', {templateUrl: '/administrator/partials/add-team.html', controller: 'team-controller'})
    .when('/account/dashboard/schedules', { templateUrl: '/administrator/partials/view-all-schedule.html' })
	.when('/account/dashboard/teams/view/:_id/:isadmin', {templateUrl: '/administrator/partials/view-team.html', controller: 'team-controller'})
	.otherwise({ redirectTo: '/' })
	
	// enable html5Mode for pushstate ('#'-less URLs)
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$locationProvider.hashPrefix('!');
});