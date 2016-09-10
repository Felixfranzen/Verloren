angular.module("verloren.samples",['ui.router', 'verloren.api', 'verloren.auth'])

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
samplesController.$inject = ["apiFactory", "$stateParams", "currentAuth"];
function samplesController(apiFactory, $stateParams, currentAuth){
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

	function toggleFavorite(id){
		if (vm.favorites.length === 0){
			vm.favorites.$add(id);
		} else {
			var found = false;
			for (var i = 0; i < vm.favorites.length; i++){
				var key = vm.favorites.$keyAt(i);
				var record = vm.favorites.$getRecord(key);
				if (record.$value === id){
					vm.favorites.$remove(record);
					found = true;
				}
			}

			if (!found){
				vm.favorites.$add(id);
			}
		}
		
	}

	function isFavorite(id){
		for (var i = 0; i < vm.favorites.length; i++){
			var key = vm.favorites.$keyAt(i);
			var record = vm.favorites.$getRecord(key);
			if (record.$value === id){
				return true;
			}
		}

		return false;
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