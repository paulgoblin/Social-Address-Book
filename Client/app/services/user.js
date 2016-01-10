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
  this.toggleFav = function(favId, cb){
    $http.post('/API/users/favorites', {favId: favId})
    .then(function(resp){
      cb(null,resp)
    }, function(err){
      cb(err)
    });
  }

  this.delete = function(data, cb){
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

  this.uploadAvatar = function(updateData, cb){
    console.log("sendin keys ", updateData);
    $http.post('/API/users/avatar', updateData)
    .then(function(resp){
      cb(null, resp);
    }, function(err){
      cb(err);
    })
  }

}
