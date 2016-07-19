/*global Firebase */
angular.module("verloren.audioPlayer", [])
.factory("audioPlayer", audioPlayer);

function audioPlayer(){

	var currentAudio;

	return {
		play: playAudio,
		stop: stopAudio
	};

	function playAudio(waveSurferObject){
		if (currentAudio){
			if (currentAudio != waveSurferObject && currentAudio.isPlaying()){
				currentAudio.pause();
			}
		}

		if (waveSurferObject.isPlaying()){
			waveSurferObject.pause();
		} else {
			waveSurferObject.play();
		}
		
		currentAudio = waveSurferObject;
	}

	function stopAudio(){
		if (currentAudio){
			currentAudio.stop();
		}
	}
}