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

}
