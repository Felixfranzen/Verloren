angular.module("verloren.audioPlayer", [])
.factory("audioPlayer", audioPlayer);

function audioPlayer(){

	var current;

	return {
		play: playAudio,
		stop: stopAudio,
		playPauseCurrent: playPauseCurrent,
		isPlaying: isPlaying,
		getCurrentTitle: getCurrentTitle
	};

	function playAudio(newSample){
		if (current){
			if (current.audio != newSample.audio && current.audio.isPlaying()){
				current.audio.pause();
			}
		}

		if (newSample.audio.isPlaying()){
			newSample.audio.pause();
		} else {
			newSample.audio.play();
		}
		
		current = newSample;
	}

	function stopAudio(){
		if (current && current.audio){
			current.audio.stop();
		}
	}

	function playPauseCurrent(){
		if (current && current.audio){
			current.audio.playPause();
		}
	}

	function isPlaying(){
		if (current && current.audio){
			return current.audio.isPlaying();
		} else {
			return false;
		}
	}

	function getCurrentTitle(){
		return current && current.title;
	}
}