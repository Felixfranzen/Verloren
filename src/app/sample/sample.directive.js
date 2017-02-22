angular.module("verloren.sample", ['verloren.api', 'verloren.audioPlayer', 'verloren.utils'])
.directive("sample", sample);

function sample(){

	sampleController.$inject = ["$element", "apiFactory", "$scope", "audioPlayer", "utils"];

	return {
		restrict: "E",
		scope: {
			content: "=",
			toggleFavorite: "=",
			isFavorite: "=",
		},
		controller: sampleController,
		controllerAs: "vm",
		templateUrl: "sample/sample.tpl.html",
		bindToController: true
	};

	function sampleController($element, apiFactory, $scope, audioPlayer, utils){
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
		vm.toggle = toggle;
		vm.favoriteCount = favoriteCount;
		vm.formatSize = utils.formatFileSize;

		wavesurfer.load(vm.content.url);
		wavesurfer.on('ready', function () {
			$scope.$evalAsync(function(){
				vm.ready = true;
				vm.downloadLink = vm.content.url;
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

		function toggle(){
			vm.toggleFavorite(vm.content.$id);
		}

		function favoriteCount(){
			if (vm.content.favorites){
				return Object.keys(vm.content.favorites).length;
			}

			return 0;
		}



	}
}