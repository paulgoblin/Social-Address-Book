// angular
//   .module('UserService', [])
//   .factory('User', ['$q', UserService]);

// function UserService($q){
//   return {
//     getCurrent: getCurrent,
//     signup: signup,
//     login: login,
//     logout: logout
//   };

//   function getCurrent(){
//     var def = $q.defer();

//     var user = User.model;
//     user.currentUser()
//       .then(function(){
//         def.resolve(user);
//       });
//     return def.promise;
//   }

//   function signup(data){
//     var def = $q.defer();

//     var user = User.model;
//     user.signup(data)
//       .then(function(){
//         def.resolve(user);
//       })
//     return def.promise;
//   }

//   function login(data){
//     var def = $q.defer();

//     var user = User.model;
//     user.login(data.email, data.password)
//       .then(function(){
//         def.resolve(user);
//       }, function(){
//         def.reject({'error': 'unable to login user'});
//       })
//     return def.promise;
//   }

//   function logout(){
//     var user = User.model;
//     user.logout()
//   }
// }