angular
  .module('UserSvc', [])
  .service('UserSvc', [UserSvc]);

function UserSvc(){
  console.log('inside user svc')
}