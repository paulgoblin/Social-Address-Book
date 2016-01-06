angular
  .module('userApp', [
    'ngFileUpload',
    'ui.router',
    'app.routes',
    'app.home',
  ])
  .controller('MainController', ['$rootScope', MainController]);

function MainController($rootScope){
  var main = this;
  // main.logout = logout;

  // $rootScope.currentUser = {};

  // User.getCurrent()
  //   .then(function(data){
  //     if(data.get('_id')){
  //       $rootScope.currentUser.id = data.get('_id');
  //     } else {
  //       $rootScope.currentUser = {};
  //     }
  //   })

  // function logout(){
  //   User.logout();
  //   $rootScope.currentUser = {};
  // }
}