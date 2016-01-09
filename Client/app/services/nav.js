'use strict';
angular
  .module('userApp')
  .service('NavSvc', NavSvc)

NavSvc.$inject = ['$http']

function NavSvc($http){
  this.home = function(cb){
    $http.get('/users/me')
      .then(function(resp){
        console.log(resp)
        cb(resp)
      }, function(err){
        console.log(err)
        cb(err)
      });
  }
  this.users = function(cb){
    $http.get('/users')
      .then(function(resp){
        console.log(resp)
        cb(resp)
      }, function(err){
        console.log(err)
        cb(err)
      });
  }
  this.logout = function(cb){
    console.log('should logout')
    localStorage.removeItem("userApp.me")
    $http.defaults.headers.common.Authorization = '';
    cb();
  }
}