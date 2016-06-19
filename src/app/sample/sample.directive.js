angular.module("verloren.sample", ['verloren.api'])
.directive("sample", sample);

function sample(){

	sampleController.$inject = ["$element", "apiFactory", "$scope"];

	return {
		restrict: "E",
		scope: {
			content: "=",
			category: "="
		},
		controller: sampleController,
		controllerAs: "vm",
		templateUrl: "sample/sample.tpl.html",
		bindToController: true
	};

	function sampleController($element, apiFactory, $scope){
		var vm = this;

		var wavesurfer = WaveSurfer.create({
			container: $element.children()[0].children[2],
			waveColor: "#8FDBCF",
			normalize: true,
			barWidth: 3
		});

		vm.ready = false;
		vm.downloadLink = "";
		vm.play = playsample;
		vm.addToAudioBin = addToAudioBin;

		apiFactory.getSampleFile(vm.category, vm.content.url).then(function(url){
			wavesurfer.load(url);
			wavesurfer.on('ready', function () {
				$scope.$apply(function(){
					vm.ready = true;
					vm.downloadLink = url;
				});
			});
		});

		//functions
		function playsample(){
			if(wavesurfer !== undefined){
				if (wavesurfer.isPlaying()){
					wavesurfer.stop();
				} else {
					wavesurfer.playPause();
				}
			}
		}

		function addToAudioBin(){}



	}
}