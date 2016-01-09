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
    console.log('original data', data);
    var clone = shallowCloneObject(data);
    return clone[key];
  }

  function shallowCloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    
    for (var key in obj) {
      temp[key] = shallowCloneObject(obj[key]);
    }
 
    return temp;
  }

}
