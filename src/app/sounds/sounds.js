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

	vm.currentCategory = "loops";
	vm.categories = ["loops", "kick", "snare", "clap", "cymbal", "tom", "noise", "hihat"];
	
	vm.categoryClicked = categoryClicked;
	vm.categoryClasses = categoryClasses;


	function categoryClicked(value){
		if (value !== vm.currentCategory){
			vm.currentCategory = value;
			//get shit from database and populate vm.samples
		}
	}

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

	function categoryClasses(index){
		var classes = "";
	
		if (vm.categories[index] === vm.currentCategory){
				classes += "active ";
			}

		switch (index % 8){
			case 1:
				classes += "green";
				break;
			case 2:
				classes += "greentwo";
				break;
			case 3:
				classes += "light-blue";
				break;
			case 4:
				classes += "dark-blue";
				break;
			case 5:
				classes += "purpleone";
				break;
			case 6:
				classes += "purpletwo";
				break;
			case 7:
				classes += "purplethree";
				break;
			default: 
				classes += "green";
				break;
		}

		return classes;
	}
}