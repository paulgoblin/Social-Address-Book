'use strict';
angular
  .module('userApp')
  .service('UserSvc', ['$http', UserSvc]);

function UserSvc($http){
  this.edit = function(data, cb){
    $http({
      method: 'PUT',
      url: '/API/users',
      data: data
    }).then(function(resp){
      cb(null,resp)
    }, function(err){
      cb(err)
    });
  }
  this.delete = function(data, cb){
    console.log('delete', data);
    $http({
      method: 'DELETE',
      url: '/API/users',
      headers: {"Content-Type": "application/json;charset=utf-8"},
      data: data
    }).then(function(resp){
      cb(null, resp)
    }, function(err){
      cb(err)
    });
  }

}
