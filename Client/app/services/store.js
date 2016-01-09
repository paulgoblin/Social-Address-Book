'use strict';
angular
  .module('userApp')
  .service('StoreSvc', StoreSvc)

StoreSvc.$inject = []

function StoreSvc(){
  let data = {};
  // let listenerCbs = [];

  // this.addChangeListener = function(cb) {
  //   listenerCbs.push(cb);
  // }

  // var emitChange = function(){
  //   listenerCbs.forEach(function(cb){
  //     angular.isFunciton(cb)cb();
  //   });
  // }

  this.saveData = function(key, info){
    data[key] = info;
    // emitChange();
  }
  this.returnData = function(key){
    return data[key];
  }

}
