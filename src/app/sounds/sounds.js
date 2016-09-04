angular.module("verloren.sounds",['ui.router', 'verloren.api'])

.config(function config($stateProvider){
	$stateProvider.state("sounds", {
		url: "/sounds",
		views: {
			"main": {
				controller: "SoundsController as vm",
				templateUrl: "sounds/sounds.tpl.html"
			}
		},
		data:{ pageTitle: 'Sounds' },
		resolve: {
			"currentAuth": ["authFactory", function(authFactory) {
				return authFactory.requireSignIn();
			}]
		}
	});
})

.controller("SoundsController", SoundsController);
SoundsController.$inject = ["apiFactory","currentAuth"];
function SoundsController(apiFactory, currentAuth){
	var vm = this;

	vm.selectedCategory = "loop";

	var categories = apiFactory.getSampleCategories();
	categories.$loaded(function(data){
		vm.categories = data.map(function(elem){
			return elem.$value;
		});
	});
	
	vm.samples = apiFactory.getSamplesFromCategory(vm.selectedCategory);
	vm.filters = apiFactory.getFiltersForCategory(vm.selectedCategory);

	vm.activeTags = [];
	vm.activeFormats = [];

	vm.categoryClicked = categoryClicked;
	vm.categoryClasses = categoryClasses;
	vm.filterSamples = filterSamples;

	function categoryClicked(value){
		if (value !== vm.selectedCategory){	

			//Clear filters
			vm.checkboxes = {};
			vm.activeTags = [];
			vm.activeFormats = [];
			//remove listener
			vm.samples.$destroy();
			
			//update sample list
			vm.samples = apiFactory.getSamplesFromCategory(value);
			vm.filters = apiFactory.getFiltersForCategory(value);

			vm.selectedCategory = value;
		}
	}

	function categoryClasses(index){
		var classes = "";
		var colors = ["green", "green", "greentwo", "light-blue", "dark-blue", "purpleone", "purpletwo", "purplethree"];
		if (vm.categories[index] === vm.selectedCategory){
				classes += "active ";
			}
		classes += colors[index % colors.length];
		return classes;
	}

	function filterSamples(){
		return function(sample){
			//check if the sample has all tags
			for (var i = 0; i < vm.activeTags.length; i++){
				if (sample.tags.indexOf(vm.activeTags[i]) === -1){
					return false;
				}
			}

			//check if the sample has the right format
			return vm.activeFormats.indexOf(sample.format) > -1 || vm.activeFormats.length === 0;
		};
	}

}