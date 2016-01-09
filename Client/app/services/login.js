'use strict';
angular
  .module('LoginSvc', [])
  .service('LoginSvc', ['$http', LoginSvc]);

function LoginSvc($http){

  this.register = function(input){
    return $http.post('/API/auth/register', input)
  }

  this.login = function(input){
    return $http.post('/API/auth/login', input)
  }

  this.setAuthHeader = function(token) {
    $http.defaults.headers.common.Authorization = token;
  }
}
