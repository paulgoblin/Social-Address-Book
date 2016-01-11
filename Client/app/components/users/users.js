'use strict';
angular
  .module('userApp')
  .controller('UsersCtrl', ['$scope', 'UserSvc', 'StoreSvc', 'NavSvc', UsersCtrl]);

function UsersCtrl($scope, UserSvc, StoreSvc, NavSvc){
  $scope.modalShown = false;

  $scope.activeCards = {};

  NavSvc.users(function (err, resp){
    if (err===401) {
        $state.go('landing_page');
        return;
    }
    StoreSvc.saveData('users', resp.data);
    $scope.users = StoreSvc.returnData("users").map(user => {
      user.avatar = UserSvc.getAvatarSrc(user);
      return user;
    })
  })

  NavSvc.home(function (err, resp){
    if (err===401){
      $state.go('landing_page');
      return;
    }
    $scope.me = StoreSvc.returnData("me") || {favorites: []};
    $scope.isFav = (_id) => {
      return $scope.me.favorites.some(faved_id => {
        return _id == faved_id;
      })
    }
  })

  $scope.showFavs = false;

  

  $scope.makeFav = (_id) => {
    UserSvc.toggleFav(_id , favRespHandler);
  }

  $scope.toggleModal = function(idx, $event){
    $event.stopPropagation();
    $scope.modalShown = !$scope.modalShown;
    $scope.current_user = $scope.users[idx];
    console.log('togglemodal shown')
  }

  $scope.save = function(){
    // var user = {};
    var toEdit = $scope.current_user;
    console.log(toEdit);
    UserSvc.edit(toEdit, function (err, resp){
      if (err) console.log(err);
    });

    $scope.modalShown = !$scope.modalShown;
  }

  $scope.deleteUser = (user) => {
    if(window.confirm("Do you really want to delete this user?")){
      UserSvc.delete(user, function(err, resp){
        if(err){console.log(err)}
        console.log(resp)
      })
    }
  }

  $scope.toggleActive = function(_id, $event) {
    $event.stopPropagation();
    $scope.activeCards[_id] = !$scope.activeCards[_id];
  }

  $scope.toggleFavs = function(){
    $scope.showFavs = !$scope.showFavs
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
