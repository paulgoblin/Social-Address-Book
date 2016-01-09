angular
  .module('userApp')
  .controller('NavbarCtrl', ['$scope','$state','NavSvc','StoreSvc', NavbarCtrl]);

function NavbarCtrl($scope, $state, NavSvc, StoreSvc){
  $scope.home = function(){
    NavSvc.home(function(resp){
      if (resp.status === 401){
        console.log('edward')
        $state.go('landing_page')
      } else if (resp.status >= 400 && resp.status !== 401) {
        console.log(resp)
      } else {
        StoreSvc.saveData('me', resp.data);
        $state.go('home')
      }
    });
  }

  $scope.users = function(){
    NavSvc.users(function(resp){
      console.log(resp.status)
      if (resp.status === 401){
        $state.go('landing_page')
      } else if (resp.status >= 400 && resp.status !== 401){
        console.log(resp)
      }else{
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