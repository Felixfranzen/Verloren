angular.module("verloren.filterButtons",[])

.directive("filterButtons", filterButtons);


function filterButtons() {
	return {
		restrict: "E",
		scope: {
			activeFilters: "=",
			filters: "=",
			//for clearing the buttons
			buttonModel: "="
		},
		controller: filterButtonsController,
		controllerAs: "vm",
		templateUrl: "common/filterButtons/filterButtons.tpl.html",
		bindToController: true
	};

	function filterButtonsController(){
		var vm = this;
		vm.filterClicked = filterClicked;

		function filterClicked(value){

			var index = vm.activeFilters.indexOf(value);
			if (index === -1){
				vm.activeFilters.push(value);
			} else {
				vm.activeFilters.splice(index, 1);
			}
	}


	}


}