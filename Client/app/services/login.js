angular
  .module('LoginSvc', [])
  .service('LoginSvc', ['$http', LoginSvc]);

function LoginSvc($http){

  this.register = function(input){
    console.log(input)
    return $http.post('/auth/register', input)
  }

  this.login = function(input){
    console.log(input.username)
    return $http.post('/auth/login', input)
  }

}

