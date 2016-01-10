angular
  .module('userApp', [
    'ui.router',
    'naif.base64',
    'app.routes',
    'app.landing_page',
    'LocalStorageModule',
    'LoginSvc'
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
