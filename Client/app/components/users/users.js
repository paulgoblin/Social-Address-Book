'use strict';
angular
  .module('userApp')
  .controller('UsersCtrl', ['$scope', 'UserSvc', 'StoreSvc', UsersCtrl]);

function UsersCtrl($scope, UserSvc, StoreSvc){
  $scope.activeCards = {};
  $scope.users = StoreSvc.returnData("users");

  $scope.makeFav = (_id) => {
    $scope.users.forEach( user => {
      if (user._id === _id) user.isFav = !user.isFav;
    // update DB and then change local .isFav
    })
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

}

