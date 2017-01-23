angular.module("verloren.sounds",['ui.router', 'verloren.api', 'verloren.utils'])

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
soundsController.$inject = ["apiFactory", "utils"];
function soundsController(apiFactory, utils){
	var vm = this;

	var categories = apiFactory.getSampleCategories();
	categories.$loaded(function(data){
		vm.categories = data.map(function(elem){
			return elem.$value;
		});
	});

	vm.categoryClasses = utils.rainbow;
}