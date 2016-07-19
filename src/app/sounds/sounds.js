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
		data:{ pageTitle: 'Sounds' }
	});
})

.controller("SoundsController", SoundsController);
SoundsController.$inject = ["apiFactory"];
function SoundsController(apiFactory){
	var vm = this;

	vm.selectedCategory = "loop";

	//TODO: Retrieve from backend instead
	vm.categories = ["loop", "kick", "snare", "clap", "cymbal", "tom", "noise", "hihat"];
	vm.tags = ["techno", "tech house", "processed", "energetic", "atmospheric", "vintage", "distorted", "melodic"];
	vm.samples = apiFactory.getSamplesFromCategory(vm.selectedCategory);

	vm.activeTags = [];

	vm.categoryClicked = categoryClicked;
	vm.categoryClasses = categoryClasses;
	vm.filterSamples = filterSamples;

	function categoryClicked(value){
		if (value !== vm.selectedCategory){	
			vm.checkboxes = {};
			vm.activeTags = [];
			//remove listener
			vm.samples.$destroy();
			
			//update sample list
			vm.selectedCategory = value;
			vm.samples = apiFactory.getSamplesFromCategory(value);
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
		return function(value){
			//TODO: make the tags actually work
			return (vm.activeTags.indexOf(value.title) > -1 || vm.activeTags.length === 0);
		};
	}

}