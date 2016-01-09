angular
  .module('LoginSvc', [])
  .service('LoginSvc', ['$http', LoginSvc]);

function LoginSvc($http){

  this.register = function(input){
    console.log(input)
    return $http.post('/noHash/auth/register', input)
  }

  this.login = function(input){
    console.log(input.username)
    return $http.post('/noHash/auth/login', input)
  }

  this.setAuthHeader = function(token) {
    $http.defaults.headers.common.Authorization = token;
  }
}