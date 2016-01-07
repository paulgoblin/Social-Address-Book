'use strict';

var app = angular.module('loginApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.test = "controller here"
  console.log($scope.test);

});