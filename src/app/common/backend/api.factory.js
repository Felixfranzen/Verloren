/*global Firebase */
angular.module("verloren.api", ['firebase'])
.factory("apiFactory", apiFactory);

apiFactory.$inject = ["$firebaseArray"];
function apiFactory($firebaseArray){
	
	var database;
	var storage;

	return {
		initApp: initApp,
		getSamplesFromCategory: getSamplesFromCategory,
		getSampleFile: getSampleFile
	};

	function initApp(){
		if (!database && !storage){
			var config = {
				apiKey: "AIzaSyBTPPku7YhNI9bKIiM1TJJUtOzmhGlyC7I",
				authDomain: "project-5236424344136698610.firebaseapp.com",
				databaseURL: "https://project-5236424344136698610.firebaseio.com",
				storageBucket: "project-5236424344136698610.appspot.com"
			};

			firebase.initializeApp(config);
			database = firebase.database();
			storage = firebase.storage();
		
		}
	}
	function getSamplesFromCategory(category){
		return $firebaseArray(database.ref("samples/" + category));
	}

	function getSampleFile(category, id){
		return storage.ref().child("samples/" + category + "/" + id).getDownloadURL();
	}
}