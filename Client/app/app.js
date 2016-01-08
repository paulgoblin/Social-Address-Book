angular
  .module('userApp', [
    'ui.router',
    'app.routes',
    'app.home',
    'app.users',
    'app.landing_page',
    'LocalStorageModule',
    'LoginSvc',
    'UserSvc'
  ])
  .config(['localStorageServiceProvider', LS])
  .run(['$rootScope', 'localStorageService', RS])
  .controller('MainCtrl', ['LoginSvc', MainCtrl]);

function LS(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('userApp');
}

function RS($rootScope, localStorageService) {
  $rootScope.LS = localStorageService
}

function MainCtrl(LoginSvc){
  console.log("in the main ctrl")
  var main = this;
  main.isLoggedIn = (localStorage["userApp.me"])

  main.logout = function (){
    main.isLoggedIn = false;
    // console.log("need to logout")
    localStorage.removeItem("userApp.me")
  }
}