angular.module("verloren.filterSlider",[])

.directive("filterSlider", filterSlider);


function filterSlider() {
	return {
		restrict: "E",
		scope: {
			value: "=",
			min: "=",
			max: "="
		},
		controller: filterSliderController,
		controllerAs: "vm",
		templateUrl: "common/filterSlider/filterSlider.tpl.html",
		bindToController: true
	};

	function filterSliderController(){
		var vm = this;
	}


}