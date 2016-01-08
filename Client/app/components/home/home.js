angular
  .module('app.home', [])
  .controller('HomeCtrl', ['UserSvc', 'StoreSvc', HomeCtrl]);

function HomeCtrl(UserSvc, StoreSvc){
  var home = this;
  StoreSvc.saveData('key', 'data');
  
}