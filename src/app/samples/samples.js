angular.module("verloren.samples",['ui.router', 'verloren.api', 'verloren.auth', "firebase"])

.config(function config($stateProvider){
	$stateProvider.state("sounds.samples", {
		url: "/:category",
		views: {
			"samples": {
				controller: "samplesController as vm",
				templateUrl: "samples/samples.tpl.html"
			}
		},
		resolve: {
			"currentAuth": ["authFactory", function(authFactory) {
				return authFactory.requireSignIn();
			}]
		}
	});
})

.controller("samplesController", samplesController);
samplesController.$inject = ["apiFactory", "$stateParams", "currentAuth", "$firebaseObject"];
function samplesController(apiFactory, $stateParams, currentAuth, $firebaseObject){
	var vm = this;
	vm.category = $stateParams.category;
	vm.samples = apiFactory.getSamplesFromCategory(vm.category);
	vm.filters = apiFactory.getFiltersForCategory(vm.category);
	vm.favorites = apiFactory.getFavoritesForUser(currentAuth.uid);

	vm.activeTags = [];
	vm.activeFormats = [];

	vm.filterSamples = filterSamples;
	vm.toggleFavorite = toggleFavorite;
	vm.isFavorite = isFavorite;
	
	vm.orderBy = "title";
	vm.order = order;


	function toggleFavorite(id){
		if (vm.favorites[id]){
			vm.favorites[id] = null;
		} else {
			vm.favorites[id] = true;
		}		
		
		vm.favorites.$save();

		var userRef = apiFactory.getUserFavoritesForSample(id);
		userRef.$loaded(function(users){
			if (users[currentAuth.uid]){
				users[currentAuth.uid] = null;
			} else {
				users[currentAuth.uid] = true;
			}
			userRef.$save();
		});
	}

	function isFavorite(id){
		return vm.favorites[id];
	}

	function order(sample){
		switch(vm.orderBy){
			case "favorites":
				return numOfFavorites(sample);
			default:
				return sample[vm.orderBy];
		}
	}

	//Order helpers
	function numOfFavorites(sample){
		if (sample.favorites){
			/*
				orderBy sorts with ascending(?) order (smallest values first) if you don't pass reverse=true. 
				Since number of favorites is the only thing we wanna sort in descending order as of now, this
				might be a better solution than to constantly track if we should reverse the order or not
			*/
			return -Math.abs(Object.keys(sample.favorites).length);
		}

		return 0;
	}

	function filterSamples(sample){
		//check if the sample has all tags
		for (var i = 0; i < vm.activeTags.length; i++){
			if (sample.tags.indexOf(vm.activeTags[i]) === -1){
				return false;
			}
		}

		//check if the sample has the right format
		return vm.activeFormats.indexOf(sample.format) > -1 || vm.activeFormats.length === 0;
	}

}