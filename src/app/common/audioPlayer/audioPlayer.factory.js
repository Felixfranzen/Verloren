angular.module("verloren.audioPlayer", [])
.factory("audioPlayer", audioPlayer);

function audioPlayer(){

	var currentAudioObject;

	return {
		play: playAudio,
		playCurrent: playCurrent,
		pauseCurrent: pauseCurrent,
		stop: stopAudio,
		isPlaying: isPlaying
	};

	function playAudio(waveSurferObject){
		if (currentAudioObject){
			if (currentAudioObject != waveSurferObject && currentAudioObject.isPlaying()){
				currentAudioObject.pause();
			}
		}

		if (waveSurferObject.isPlaying()){
			waveSurferObject.pause();
		} else {
			waveSurferObject.play();
		}

		currentAudioObject = waveSurferObject;
	}

	function playCurrent(){
		if (currentAudioObject){
			currentAudioObject.play();
		}
	}

	function pauseCurrent(){
		if (currentAudioObject){
			currentAudioObject.pause();
		}
	}

	function stopAudio(){
		if (currentAudioObject){
			currentAudioObject.stop();
		}
	}

	function isPlaying(){
		return currentAudioObject && currentAudioObject.isPlaying();
	}
}
