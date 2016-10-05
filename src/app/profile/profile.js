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
		vm.samples = samples;
	});

	vm.favorites = apiFactory.getFavoritesForUser(currentAuth.uid);

	vm.toggleFavorite = toggleFavorite;

	function toggleFavorite(id){
		vm.favorites[id] = null;
		vm.favorites.$save();

		var userRef = apiFactory.getUserFavoritesForSample(id);
		userRef.$loaded(function(users){
			users[currentAuth.uid] = null;
			userRef.$save();
		});

		vm.samples.map(function(sample){
			if (sample.$id === id){
				vm.samples.splice(vm.samples.indexOf(sample),1);
				return;
			}
		});
	}

}