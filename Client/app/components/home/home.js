angular
  .module('userApp')
  .controller('HomeCtrl', ['$scope', 'UserSvc', 'StoreSvc', HomeCtrl])
  .directive('modal', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'>"+
                "<div class='reveal-modal' ng-show='show'>"+
                  "<div ng-transclude></div>"+
                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
                "</div>"+
                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
              "</div>"
  };
});

function HomeCtrl($scope, UserSvc, StoreSvc, $modal, $log){
  var user = StoreSvc.returnData('me')
  $scope.user = user;
  $scope.modalShown = false;
  $scope.toggleModal = function(){
    $scope.modalShown = !$scope.modalShown;
    console.log('modalShown')
  }
  $scope.save = function(){

  }
}