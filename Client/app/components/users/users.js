'use strict';
angular
  .module('userApp')
  .controller('UsersCtrl', ['$scope', 'UserSvc', 'StoreSvc', UsersCtrl]);

function UsersCtrl($scope, UserSvc, StoreSvc){
  $scope.activeCards = {};
  $scope.users = StoreSvc.returnData("users");
  $scope.me = StoreSvc.returnData("me");

  $scope.isFav = (_id) => {
    return $scope.me.favorites.some(faved_id => {
      return _id == faved_id
    })
  }

  $scope.makeFav = (_id) => {
    UserSvc.edit(_id , favRespHandler);
  }

  $scope.editInfo = (_id) => {
    console.log('youre editing my info!')
  }

  $scope.deleteUser = (_id) => {
    alert("ARE YOU FREAKIN SURE?")
  }

  $scope.toggleActive = function(_id) {
    $scope.activeCards[_id] = !$scope.activeCards[_id];
  }

  function favRespHandler (err, res) {
    if (err) return console.log( err );

    var updatedUser = res.data;
    $scope.users.find(user => {
      return user._id === updatedUser._id;
    }).favorites = updatedUser.favorites;
    StoreSvc.saveData('users', $scope.users);
    StoreSvc.saveData('me', updatedUser);
    $scope.users = StoreSvc.returnData("users");
    $scope.me = StoreSvc.returnData("me");
  }

}
