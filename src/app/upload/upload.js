angular.module("verloren.upload",['ui.router', 'verloren.api' ,'verloren.auth', 'ngFileUpload', 'verloren.modals', 'verloren.utils'])

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
uploadController.$inject = ["apiFactory", "authFactory", "$state", "$scope", "currentAuth", "modals", "utils"];
function uploadController(apiFactory, authFactory, $state, $scope, currentAuth, modals, utils){

	var STATES = {
		"UPLOADING": "uploading",
		"FINISHED": "finished"
	};

	var vm = this;
	var db = apiFactory.sampleDataReference();

	categories = apiFactory.getSampleCategories();
	categories.$loaded(function(data){
		vm.categories = data.map(function(elem){
			return elem.$value;
		});
		vm.sampleData.category = vm.categories[0];
	});

	vm.sampleData = {};
	vm.upload = upload;
	vm.clear = clear;
	vm.openTerms = openTerms;
	vm.formatSize = utils.formatFileSize;
	vm.categoryClass = utils.rainbow;
	vm.states = STATES;

	function upload(){
		if (!vm.audioFile){
			return;
		}

		var category = vm.sampleData.category;
		var format = "." + vm.audioFile.type.replace('audio/', '');
		var size = vm.audioFile.size;
		var title = vm.sampleData.title || vm.audioFile.name;
		var uploader = currentAuth.displayName || currentAuth.email;

		db.$add({
			bitrate: "Unknown",
			category: category,
			favorites: [],
			format: format,
			pack: false,
			size: size,
			tags: [],
			title: title,
			uploader: uploader,
			url: ""
		}).then(function(ref){
			vm.uploadState = STATES.UPLOADING;
			uploadTask = apiFactory.sampleStorageReference(ref.key).put(vm.audioFile);
			uploadTask.on('state_changed', function(snapshot){
				$scope.$evalAsync(function(){
					var progress = parseInt((snapshot.bytesTransferred/snapshot.totalBytes)*100, 10) || 1;
					vm.uploadProgress = progress+10;
				});
			}, function(error) {
				//handle error

			}, function() {
				vm.uploadState = STATES.FINISHED;
				record = db.$getRecord(ref.key);
				record.url = uploadTask.snapshot.downloadURL;
				db.$save(record);
			});

		});
	}

	function clear(){
		if (vm.uploadState === STATES.UPLOADING){
			return;
		}
		vm.uploadState = "";
		vm.audioFile = "";
		vm.uploadProgress = 0;
		vm.sampleData = {};
	}

	function openTerms(){
		modals.termsOfUse();
	}

	$scope.$watch('vm.audioFile', function(){
		if (!vm.audioFile){
			return;
		}
		vm.sampleData.title = vm.audioFile.name;
	});
}
