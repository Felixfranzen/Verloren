angular.module( 'verloren', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ui.router',
  'ui.bootstrap',
  'verloren.sounds',
  'verloren.samples',
  'verloren.sample',
  'verloren.api',
  'verloren.filterButtons',
  'verloren.filterSlider',
  'verloren.audioPlayer',
  'verloren.auth',
  'verloren.login',
  'verloren.signup',
  'verloren.profile'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/samples/loop' );
})

.run(appRunning)
.controller( 'AppCtrl', function AppCtrl ( $scope, $location, authFactory, $state ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Verloren' ;
    }
  });
  
  $scope.loggedIn = false;
  $scope.userEmail = "";

  authFactory.onAuthChange(function(user){
    console.log(user);
    if(!user){
        $scope.loggedIn = false;
        $scope.userEmail = "";
        $state.go("login");
    } else {
        $scope.loggedIn = true;
        $scope.userEmail = user.email;
    }
  });

  $scope.logout = function(){
        $scope.loggedIn = false;
        authFactory.logout();
    };
})

;


appRunning.$inject = ["apiFactory", "$rootScope", "$state"];
function appRunning(apiFactory, $rootScope, $state){
  
  apiFactory.initApp();

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
}

