angular.module("verloren.profile",['ui.router', 'verloren.api', 'verloren.auth'])

.config(function config($stateProvider){
	$stateProvider.state("profile", {
		url: "/profile",
		views: {
			"main": {
				controller: "profileController as vm",
				templateUrl: "profile/profile.tpl.html"
			}
		},
		resolve: {
			"currentAuth": ["authFactory", function(authFactory) {
				return authFactory.requireSignIn();
			}]
		},
		data:{ pageTitle: 'Profile' }
	});
})

.controller("profileController", profileController);
profileController.$inject = ["apiFactory","currentAuth", "authFactory"];
function profileController(apiFactory, currentAuth, authFactory){
	var vm = this;
	apiFactory.getFavoriteSamples(currentAuth.uid, function(samples){
		if (samples.length) {
			vm.samples = samples;
		}
		else {
			vm.showError = "No favorites yet";
		}
	});

	vm.favorites = apiFactory.getFavoritesForUser(currentAuth.uid);

	vm.toggleFavorite = toggleFavorite;

	function toggleFavorite(id){
		vm.favorites[id] = null;
		vm.favorites.$save();
	}

}
