'use strict';
angular
  .module('userApp')
  .service('NavSvc', NavSvc)

NavSvc.$inject = ['$http']

function NavSvc($http){
  this.home = function(cb){
    $http.get('/API/users/me')
      .then(function(resp){
        console.log(resp)
        cb(null, resp)
      }, function(err){
        console.log(err)
        cb(err)
      });
  }
  this.users = function(cb){
    $http.get('/API/users')
      .then(function(resp){
        cb(null,resp)
      }, function(err){
        console.log(err)
        cb(err)
      });
  }
  this.logout = function(cb){
    localStorage.removeItem("userApp.me");
    localStorage.removeItem("userApp.token")
    $http.defaults.headers.common.Authorization = '';
    cb();
  }
}
