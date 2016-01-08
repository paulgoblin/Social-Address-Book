angular
  .module('userApp')
  .controller('NavbarCtrl', ['$scope','$state','NavSvc', NavbarCtrl]);

function NavbarCtrl($scope, $state, NavSvc){
  $scope.home = function(){
    NavSvc.home(function(resp){
      if (!resp){
        $state.go('landing_page')
      } else {
        console.log(resp)
      }
    });
  }

  $scope.users = function(){
    NavSvc.users(function(resp){
      if (!resp){
        $state.go('landing_page')
      } else {
        console.log(resp)
      }
    });
  }

  $scope.logout = function(){
    NavSvc.logout();
  }
}