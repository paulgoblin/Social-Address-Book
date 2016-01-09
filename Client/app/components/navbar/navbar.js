angular
  .module('userApp')
  .controller('NavbarCtrl', ['$scope','$state','NavSvc','StoreSvc', NavbarCtrl]);

function NavbarCtrl($scope, $state, NavSvc, StoreSvc){

  $scope.home = function(){
    NavSvc.home(function(err, resp){
      if (err){
        $state.go('landing_page')
      } else {
        StoreSvc.saveData('me', resp.data);
        $state.go('home')
      }
    });
  }

  $scope.users = function(){
    NavSvc.users(function(err, resp){
      if (err){
        $state.go('landing_page')
      } else {
        StoreSvc.saveData('users', resp.data);
        $state.go('users')
      }
    });
  }

  $scope.logout = function(){
    NavSvc.logout(function(){
      $state.go('landing_page')
    });
  }
}
