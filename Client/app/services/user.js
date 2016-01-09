angular
  .module('userApp')
  .service('UserSvc', ['$http', UserSvc]);

function UserSvc($http){
  this.edit = function(data, cb){
    $http({
      method: 'PUT',
      url: '/users',
      data: data
    }).then(function(resp){
      cb(resp)
    }, function(err){
      cb(err)
    });
  }
}
