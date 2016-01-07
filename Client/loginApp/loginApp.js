'use strict';

angular
  .module('loginApp', [

  ])
  .controller('MainCtrl', [MainCtrl]);

function MainCtrl(){
  var main = this;
  main.test = "controller here"
  console.log(main.test)
}


