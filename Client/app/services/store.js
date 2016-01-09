'use strict';
angular
  .module('userApp')
  .service('StoreSvc', StoreSvc)

StoreSvc.$inject = []

function StoreSvc(){
  let data = {};

  this.saveData = function(key, info){
    data[key] = info;
    console.log('data from store', data);
  }
  this.returnData = function(key){
    return data[key];
  }

}