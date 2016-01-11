angular
  .module('app.landing_page', [])
  .controller('LandingPageCtrl', ['LoginSvc', '$rootScope', '$state', 'StoreSvc', LandingPageCtrl]);

function LandingPageCtrl(LoginSvc, $rootScope, $state, StoreSvc){
  var landing_page = this;
  landing_page.showRegister = showRegister;
  landing_page.showLogin = showLogin;
  landing_page.login = login;
  landing_page.register = register;
  landing_page.back = back;

  function showRegister(){
    landing_page.formToShow = 'register';
  }

  function showLogin(){
    landing_page.formToShow = 'login';
  }

  function register(input){
    if ( input.password.length === 0 ) {
      landing_page.err_msg = "Password must be at least 1 character"
    } else {
      var promise = LoginSvc.register(input);
      loginResHandler( promise );
  }
  }

  function login(input){
    var promise = LoginSvc.login(input);
    loginResHandler( promise );
  }

  function back(){
    $state.transitionTo($state.current, {}, {reload: true, inherit:false, notify:true})
  }

  function loginResHandler(promise){
    promise.then(function(res){
      $rootScope.LS.set('token', `Bearer ${res.data.token}`)
      LoginSvc.setAuthHeader($rootScope.LS.get('token'));
      StoreSvc.saveData('me', res.data.user);
      $state.go('home')
    }, function(err){
      landing_page.err_msg =  err.data;
    })
  }

}
