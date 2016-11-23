angular.module("verloren.upload",['ui.router', 'verloren.api' ,'verloren.auth', 'ngFileUpload'])

.config(function config($stateProvider){
	$stateProvider.state("upload", {
		url: "/upload",
		views: {
			"main": {
				controller: "uploadController as vm",
				templateUrl: "upload/upload.tpl.html"
			}
		},
		data:{ pageTitle: 'Upload' },
		resolve: {
			"currentAuth": ["authFactory", function(authFactory) {
				return authFactory.requireSignIn();
			}]
		}
	});
})

.controller("uploadController", uploadController);
uploadController.$inject = ["apiFactory", "authFactory", "$state", "$scope"];
function uploadController(apiFactory, authFactory, $state, $scope,currentAuth){
	var vm = this;
	$scope.$watch('vm.audioFile', function(){
		if (!vm.audioFile){
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(vm.audioFile);
        
		reader.onload = function(){
			vm.audioSource = reader.result;
			
        };
	});
}
