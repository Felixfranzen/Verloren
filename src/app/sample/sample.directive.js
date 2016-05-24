angular.module("verloren.sample", [])
.directive("sample", sample);

function sample(){

	sampleController.$inject = ["$element"];

	return {
		restrict: "E",
		scope: {
			content: "="
		},
		controller: sampleController,
		controllerAs: "vm",
		templateUrl: "sample/sample.tpl.html",
		bindToController: true
	};

	function sampleController($element){
		var vm = this;

		var wavesurfer = WaveSurfer.create({
			container: $element.children()[0].children[2],
			waveColor: "#8FDBCF",
			normalize: true,
			barWidth: 3
		});

		vm.wavesurfer = wavesurfer;
		vm.play = playsample;
		vm.download = download;
		vm.addToAudioBin = addToAudioBin;


		vm.wavesurfer.on('error', function (string) {
			console.log(string);
		});
		
		wavesurfer.load(vm.content.url);

		//functions
		function playsample(){
			if (vm.wavesurfer.isPlaying()){
				vm.wavesurfer.stop();
			} else {
				vm.wavesurfer.playPause();
			}
		}
		//TODO, add these
		function download(){}
		function addToAudioBin(){}



	}
}