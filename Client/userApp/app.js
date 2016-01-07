angular
  .module('userApp', [
    'ui.router',
    'app.routes',
    'app.home'
  ])
  .controller('MainCtrl', [MainCtrl]);

function MainCtrl(){
  var main = this;
  
}