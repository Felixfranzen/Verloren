angular.module( 'verloren', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ui.router',
  'verloren.sounds',
  'verloren.sample',
  'verloren.api'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/sounds' );
})

.run(appRunning)
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Verloren' ;
    }
  });
})

;


appRunning.$inject = ["apiFactory"];
function appRunning(apiFactory){
  apiFactory.initApp();
}

