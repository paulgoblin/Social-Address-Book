angular
  .module('app.landing_page', [])
  .controller('LandingPageCtrl', ['LoginSvc', '$rootScope', '$state', '$http', LandingPageCtrl]);

function LandingPageCtrl(LoginSvc, $rootScope, $state, $http){
  var landing_page = this;
  landing_page.showRegister = showRegister;
  landing_page.showLogin = showLogin;
  landing_page.login = login;
  landing_page.register = register;

  function showRegister(){
    landing_page.formToShow = 'register';
  }

  function showLogin(){
    landing_page.formToShow = 'login';
  }

  function register(input){
    var promise = LoginSvc.register(input);
    loginResHandler( promise );
  }

  function login(input){
    var promise = LoginSvc.login(input);
    loginResHandler( promise );
  }

  function loginResHandler(promise){
    promise.then(function(res){
      $rootScope.LS.set('token', `Bearer ${res.data.token}`)
      $rootScope.LS.set('me', res.data.user)
      $http.defaults.headers.common.Authorization = $rootScope.LS.get('token')
      $state.go('home')
    }, function(err){
      landing_page.err_msg =  err.data;
    })
  }

}