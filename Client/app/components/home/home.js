'use strict';
angular
  .module('userApp')
  .controller('HomeCtrl', ['$scope', '$state', 'UserSvc', 'StoreSvc', 'NavSvc', HomeCtrl])
  .directive('modal', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'>"+
                "<div class='reveal-modal' ng-show='show'>"+
                  "<div ng-transclude></div>"+
                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
                "</div>"+
                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
              "</div>"
  };
});

function HomeCtrl($scope, $state, UserSvc, StoreSvc, NavSvc){

  var user;
  $scope.modalShown = false;
  updateView();

  function updateView() {
    NavSvc.home(function (err, resp){
      if (err===401) {
        $state.go('landing_page');
        return;
      }
      console.log("user from navSvc",resp.data);
      StoreSvc.saveData('me', resp.data);
      user = StoreSvc.returnData('me');
      $scope.user = user;
      $scope.avatarSrc = UserSvc.getAvatarSrc(user);
      console.log("avatar src", $scope.avatarSrc);
    })
  }

  $scope.uploadAvatar = function(){
    var avatarData = { _id: StoreSvc.returnData('me')._id, img: $scope.images.upload };
    UserSvc.uploadAvatar(avatarData, editResHandler)
  }

  $scope.toggleModal = function(){
    $scope.modalShown = !$scope.modalShown;
  }

  $scope.save = function(){
    // var user = {};
    console.log(user);
    UserSvc.edit( user, editResHandler );

    $scope.modalShown = !$scope.modalShown;
  }

  $scope.delete = function(){
    if (window.confirm("Do you really want to delete your account?")){
      UserSvc.delete(user, function(err, resp){
      if (err){
        console.log(err);
      } else {
        NavSvc.logout(function (){
          $state.go('landing_page');
        });
      }
    });
    }
  }

  function editResHandler(err, resp){
    if (err){
      console.log(err);
      updateView();
    }else{
      console.log("home edit response", resp.data);
      StoreSvc.saveData('me', resp.data);
      updateView();
    }
  }
}
