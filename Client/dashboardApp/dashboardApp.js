'use strict';

angular
  .module('dashboardApp', [

  ])
  .controller('DashboardCtrl', [DashboardCtrl]);

function DashboardCtrl($auth){
  var dashboard = this;
  dashboard.logout = logout;
  dashboard.test = "dashboard test"

  function logout(){
    $auth.logout();
    $state.go('home')
  }

}


