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
	vm.uploads = apiFactory.getSamplesForUser(currentAuth.uid);

	vm.toggleFavorite = toggleFavorite;
	vm.isFavorite = isFavorite;

	function toggleFavorite(id){
		vm.favorites[id] = null;
		vm.favorites.$save();

		var userRef = apiFactory.getUserFavoritesForSample(id);
		userRef.$loaded(function(users){
			users[currentAuth.uid] = null;
			userRef.$save();
		});

		vm.samples.forEach(function(sample, index){
			if (sample.$id === id){
				vm.samples.splice(index,1);
				return;
			}
		});
	}

	function isFavorite(id){
		return vm.favorites[id];
	}

}
