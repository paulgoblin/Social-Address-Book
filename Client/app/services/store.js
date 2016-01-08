'use strict';
angular
  .module('userApp')
  .service('StoreSvc', StoreSvc)

StoreSvc.$inject = ['$http']

function StoreSvc($http){
  let data = {};

  this.saveData = function(key, info){
    data[key] = info;
    console.log(data);
  }
  this.returnData = function(key){
    return data[key];
  }

}