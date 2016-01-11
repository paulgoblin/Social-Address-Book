'use strict';
angular
  .module('userApp')
  .controller('UsersCtrl', ['$scope', 'UserSvc', 'StoreSvc', UsersCtrl]);

function UsersCtrl($scope, UserSvc, StoreSvc){
  $scope.modalShown = false;

  $scope.activeCards = {};
  $scope.me = StoreSvc.returnData("me") || {favorites: []};
  $scope.showFavs = false;

  $scope.users = StoreSvc.returnData("users").map(user => {
    user.avatar = UserSvc.getAvatarSrc(user);
    return user;
  })

  $scope.isFav = (_id) => {
    return $scope.me.favorites.some(faved_id => {
      return _id == faved_id;
    })
  }

  $scope.makeFav = (_id) => {
    UserSvc.toggleFav(_id , favRespHandler);
  }

  $scope.toggleModal = function($event){
    $event.stopPropagation();
    $scope.modalShown = !$scope.modalShown;
    console.log('togglemodal shown')
  }

  $scope.save = function(){
    // var user = {};
    user.profilename = $scope.user['Profile Name'];
    user.email = $scope.user.Email;
    user.phone = $scope.user['Phone Number'];
    user.address = $scope.user.Address;
    user.about = $scope.user.Bio;
    delete user.avatar;
    console.log(user);
    UserSvc.edit( user, editResHandler );

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
