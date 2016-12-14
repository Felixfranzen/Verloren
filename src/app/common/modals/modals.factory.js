angular.module("verloren.modals", ["ui.bootstrap"])

.factory("modals", modals);

modals.$inject = ["$uibModal"];
function modals($uibModal){
	return  {
		info: info,
		termsOfUse: termsOfUse
	};

	function info(data){
		var size = data.size || "m";

		infoModalController.$inject = ["$uibModalInstance"];
		var modalInstance = $uibModal.open({
            animation: true,
            size: size,
            templateUrl: "common/modals/infoModal.tpl.html",
            controller: infoModalController,
            controllerAs: "vm"
        });


		function infoModalController($uibModalInstance){
			var vm = this;
			vm.data = data;
			vm.close = close;
			function close(){
				$uibModalInstance.close();
			}
		}

		return modalInstance;
	}

	function termsOfUse(){
		var data = {
			title: "Verloren",
			subTitle: "Terms of use",
			body: "Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem Lorem ipsum set dolor amet lorem "
		};

		return info(data);
	}
}