angular.module("verloren.sounds",['ui.router', 'verloren.api'])

.config(function config($stateProvider){
	$stateProvider.state("sounds", {
		url: "/samples",
		abstract: true,
		views: {
			"main": {
				controller: "soundsController as vm",
				templateUrl: "sounds/sounds.tpl.html"
			}
		},
		resolve: {
			"currentAuth": ["authFactory", function(authFactory) {
				return authFactory.requireSignIn();
			}]
		},
		data:{ pageTitle: 'Samples' }
	});
})

.controller("soundsController", soundsController);
soundsController.$inject = ["apiFactory","currentAuth"];
function soundsController(apiFactory, currentAuth){
	var vm = this;

	var categories = apiFactory.getSampleCategories();
	categories.$loaded(function(data){
		vm.categories = data.map(function(elem){
			return elem.$value;
		});
	});

	vm.categoryClasses = categoryClasses;


	function categoryClasses(index){
		var classes = "";
		var colors = ["green", "green", "greentwo", "light-blue", "dark-blue", "purpleone", "purpletwo", "purplethree"];
		classes += colors[index % colors.length];
		return classes;
	}

}