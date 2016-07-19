angular.module("verloren.sample", ['verloren.api', 'verloren.audioPlayer'])
.directive("sample", sample);

function sample(){

	sampleController.$inject = ["$element", "apiFactory", "$scope", "audioPlayer"];

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

	function sampleController($element, apiFactory, $scope, audioPlayer){
		var vm = this;

		var wavesurfer = WaveSurfer.create({
			container: $element.children()[0].children[2],
			waveColor: "#8FDBCF",
			normalize: true,
			barWidth: 3
		});

		vm.ready = false;
		vm.playing = false;
		vm.downloadLink = "";
		vm.play = playsample;
		vm.addToAudioBin = addToAudioBin;

		apiFactory.getSampleFile(vm.category, vm.content.url).then(function(url){
			wavesurfer.load(url);
			wavesurfer.on('ready', function () {
				$scope.$evalAsync(function(){
					vm.ready = true;
					vm.downloadLink = url;
				});
			});
		});

		wavesurfer.on('finish', function () {
			wavesurfer.stop();
			$scope.$evalAsync(function(){
				vm.playing = false;
			});
		});

		wavesurfer.on('play', function() {
			$scope.$evalAsync(function(){
				vm.playing = true;
			});
		});

		wavesurfer.on('pause', function() {
			$scope.$evalAsync(function(){
				vm.playing = false;
			});
		});

		//functions
		function playsample(){
			if(wavesurfer && vm.ready){
				audioPlayer.play(wavesurfer);
			}
		}

		function addToAudioBin(){}



	}
}