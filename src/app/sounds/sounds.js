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
	vm.categories = ["loop", "kick", "snare", "clap", "cymbal", "tom", "noise", "hihat"];
	vm.samples = apiFactory.getSamplesFromCategory(vm.selectedCategory);
	vm.categoryClicked = categoryClicked;
	vm.categoryClasses = categoryClasses;


	function categoryClicked(value){
		if (value !== vm.selectedCategory){
			//remove listener
			vm.samples.$destroy();
			
			//update sample list
			vm.selectedCategory = value;
			vm.samples = apiFactory.getSamplesFromCategory(value);
		}
	}

	function categoryClasses(index){
		var classes = "";
	
		if (vm.categories[index] === vm.selectedCategory){
				classes += "active ";
			}

		switch (index % 8){
			case 1:
				classes += "green";
				break;
			case 2:
				classes += "greentwo";
				break;
			case 3:
				classes += "light-blue";
				break;
			case 4:
				classes += "dark-blue";
				break;
			case 5:
				classes += "purpleone";
				break;
			case 6:
				classes += "purpletwo";
				break;
			case 7:
				classes += "purplethree";
				break;
			default: 
				classes += "green";
				break;
		}

		return classes;
	}
}