angular.module("verloren.samples",['ui.router', 'verloren.api'])

.config(function config($stateProvider){
	$stateProvider.state("sounds.samples", {
		url: "/:category",
		views: {
			"samples": {
				controller: "samplesController as vm",
				templateUrl: "samples/samples.tpl.html"
			}
		}
	});
})

.controller("samplesController", samplesController);
samplesController.$inject = ["apiFactory", "$stateParams"];
function samplesController(apiFactory, $stateParams){
	var vm = this;

	vm.category = $stateParams.category;

	vm.samples = apiFactory.getSamplesFromCategory(vm.category);
	vm.filters = apiFactory.getFiltersForCategory(vm.category);

	vm.activeTags = [];
	vm.activeFormats = [];

	vm.filterSamples = filterSamples;

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