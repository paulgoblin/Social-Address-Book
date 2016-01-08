angular
  .module('app.home', [])
  .controller('HomeCtrl', ['UserSvc', HomeCtrl]);

function HomeCtrl(UserSvc){
  var home = this;
}