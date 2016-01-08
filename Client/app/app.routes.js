angular
  .module('app.routes', [])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);


function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider){

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/components/home/home.html',
      controller: 'HomeCtrl as home'
    })
     .state('landing_page', {
      url: '/',
      templateUrl: 'app/components/landing_page/landing_page.html',
      controller: 'LandingPageCtrl as landing_page'
    })
     .state('users', {
      url: '/users',
      templateUrl: 'app/components/users/users.html',
      controller: 'UsersCtrl as users'
    })
}