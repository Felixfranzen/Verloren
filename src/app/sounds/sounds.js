angular.module("verloren.sounds",['ui.router'])

.config(function config($stateProvider){
	$stateProvider.state("sounds", {
		url: "/sounds",
		views: {
			"main": {
				controller: "SoundsController as vm",
				templateUrl: "sounds/sounds.tpl.html"
			}
		},
		data:{ pageTitle: 'Sounds' }
	});
})

.controller("SoundsController", SoundsController);
SoundsController.$inject = [];
function SoundsController(){
	var vm = this;
	vm.samples = [
		{
			id: 0,
			title: "808 Demo Loop",
			pack: "Essential 808 samples",
			uploader: "Rodhad",
			bitrate: "44100",
			size: "1MB",
			format: ".MP3",
			url: "assets/samples/demo.mp3"
		},
		{
			id: 1,
			title: "909 Kick",
			pack: "Essential 909 samples",
			uploader: "Jeff Mills",
			bitrate: "44100",
			size: "193KB",
			format: ".WAV",
			url: "assets/samples/kicktwo.wav"
		},
		{
			id: 2,
			title: "707 DEMO LOOP",
			pack: "Essential 808 samples",
			uploader: "Dusky",
			bitrate: "44100",
			size: "193KB",
			format: ".MP3",
			url: "assets/samples/kick.wav"
		}
	];
}