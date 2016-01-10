angular
  .module('userApp')
  .controller('HomeCtrl', ['$scope', 'UserSvc', 'StoreSvc', 'NavSvc', '$state', HomeCtrl])
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

function HomeCtrl($scope, UserSvc, StoreSvc, NavSvc, $state){

  var user;

  if (StoreSvc.returnData('me')){
    updateView();
  }else{
    NavSvc.home(function (err, resp){
      if (err) {
        $state.go('landing_page');
        return;
      }
      StoreSvc.saveData('me', resp.data);
      updateView();
    })
  }

  function updateView (){
    user = StoreSvc.returnData('me')
    var User = {
      'Profile Name': user.profilename,
      Email: user.email,
      'Phone Number': user.phone,
      Address: user.address,
      Bio: user.about
    };

    $scope.user = User;
  }

  // var user = updateView();

  $scope.modalShown = false;

  $scope.toggleModal = function(){
    $scope.modalShown = !$scope.modalShown;
  }

  $scope.save = function(){
    user.profilename = $scope.user['Profile Name'];
    user.email = $scope.user.Email;
    user.phone = $scope.user['Phone Number'];
    user.address = $scope.user.Address;
    user.about = $scope.user.Bio;

    UserSvc.edit(user, function (err, resp){
      if (err){
        console.log(err);
        updateView();
      }else{
        StoreSvc.saveData('me', resp.data);
      }

    });
    $scope.modalShown = !$scope.modalShown;
  }

  $scope.delete = function(){
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
