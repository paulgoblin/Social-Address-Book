'use strict';
angular
  .module('userApp')
  .service('StoreSvc', StoreSvc)

StoreSvc.$inject = []

function StoreSvc(){
  let data = {};

  this.saveData = function(key, info){
    data[key] = info;
  }
  this.returnData = function(key){
    return data[key];
  }

}
