angular
  .module('userApp', [
    'ui.router',
    'app.routes',
    'app.home',
    'app.users',
    'app.landing_page',
    'LocalStorageModule',
    'LoginSvc'
  ])
  .config(['localStorageServiceProvider', LS])
  .run(['$rootScope', 'localStorageService', RS])

function LS(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('userApp');
}

function RS($rootScope, localStorageService) {
  $rootScope.LS = localStorageService
}


