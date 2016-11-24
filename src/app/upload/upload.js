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
uploadController.$inject = ["apiFactory", "authFactory", "$state", "$scope", "currentAuth"];
function uploadController(apiFactory, authFactory, $state, $scope, currentAuth){
	var vm = this;
	var db = apiFactory.sampleDataReference();
	vm.sampleData = {};
	vm.upload = upload;

	function upload(){
		if (!vm.audioFile){
			return;
		}
		var category = vm.sampleData.category || 'loop';
		var format = "." + vm.audioFile.type.replace('audio/', '');
		var size = parseInt(vm.audioFile.size/1000, 10) + "kb";
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
			uploadTask = apiFactory.sampleStorageReference(ref.key).put(vm.audioFile);
			uploadTask.on('state_changed', function(snapshot){
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(progress);
			}, function(error) {
				//handle error

			}, function() {
				record = db.$getRecord(ref.key);
				record.url = uploadTask.snapshot.downloadURL;
				db.$save(record);
			});

		});
	}

	$scope.$watch('vm.audioFile', function(){
		if (!vm.audioFile){
			return;
		}
	});
}
