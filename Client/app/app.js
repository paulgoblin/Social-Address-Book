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
  .run(['$rootScope','$http','localStorageService', RS])

function LS(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('userApp');
}

function RS($rootScope, $http, localStorageService) {
  $rootScope.LS = localStorageService;
  $http.defaults.headers.common.Authorization = $rootScope.LS.get('token');
}
