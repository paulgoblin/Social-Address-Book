'use strict';
angular
  .module('userApp')
  .service('NavSvc', NavSvc)

NavSvc.$inject = ['$http']

function NavSvc($http){
  this.home = function(cb){
    $http.get('/API/users/me')
      .then(function(resp){
        console.log(resp.data);
        cb(resp.status, resp)
      }, function(err){
        console.log(err)
        cb(err.status)
      });
  }
  this.users = function(cb){
    $http.get('/API/users')
      .then(function(resp){
        cb(resp.status,resp)
      }, function(err){
        console.log(err)
        cb(err.status)
      });
  }
  this.logout = function(cb){
    localStorage.removeItem("userApp.me");
    localStorage.removeItem("userApp.token")
    $http.defaults.headers.common.Authorization = '';
    cb();
  }
}
