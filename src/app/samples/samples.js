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
	vm.filters = {};

	vm.samples = apiFactory.getSamplesFromCategory(vm.category);
	vm.samples.$loaded().then(function(){
		vm.filters.formats = vm.samples.reduce(function(formats, sample){
			if (formats.indexOf(sample.format) === -1){
				formats.push(sample.format);
				return formats;
			}

			return formats;

		}, []);

		vm.filters.tags = [];

	});

	vm.favorites = apiFactory.getFavoritesForUser(currentAuth.uid);

	vm.activeTags = [];
	vm.activeFormats = [];
	vm.searchInput = "";

	vm.toggleFavorite = toggleFavorite;
	vm.isFavorite = isFavorite;
	vm.filterSamples = filterSamples;

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

	//Order helpers
	function numOfFavorites(sample){
		if (sample.favorites){
			return -Math.abs(Object.keys(sample.favorites).length);
		}

		return 0;
	}

	function filterSamples(sample){
		//Check that it matches the search string
		if (vm.searchInput && vm.searchInput.length > 0){
			if (sample.title.toLowerCase().indexOf(vm.searchInput.toLowerCase()) === -1){
				return false;
			}
		}

		//check if the sample has all tags
		for (var i = 0; i < vm.activeTags.length; i++){
			if (sample.tags.indexOf(vm.activeTags[i]) === -1){
				return false;
			}
		}

		//check if the sample has the right format
		return vm.activeFormats.indexOf(sample.format) > -1 || vm.activeFormats.length === 0;
	}

	function order(sample){
		switch(vm.orderBy){
			case "favorites":
				return numOfFavorites(sample);
			default:
				return sample[vm.orderBy];
		}
	}

}