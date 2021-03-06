/*global Firebase */
angular.module("verloren.api", ['firebase'])
.factory("apiFactory", apiFactory);

apiFactory.$inject = ["$firebaseArray", "$firebaseObject"];
function apiFactory($firebaseArray, $firebaseObject){
	
	var database;
	var storage;

	return {
		initApp: initApp,
		getFavoriteSamples: getFavoriteSamples,
		getSamplesFromCategory: getSamplesFromCategory,
		getSampleFile: getSampleFile,
		getSampleCategories: getSampleCategories,
		getFiltersForCategory: getFiltersForCategory,
		getFavoritesForUser: getFavoritesForUser,
		getUserFavoritesForSample: getUserFavoritesForSample,
		sampleDataReference: sampleDataReference,
		sampleStorageReference: sampleStorageReference
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

	function getFavoriteSamples(id, callback){
		var favorites = getFavoritesForUser(id);
		favorites.$loaded().then(function(){
			
			var allSamples = $firebaseArray(database.ref("samples"));
			allSamples.$loaded().then(function(){

				var filtered = allSamples.filter(function(sample){
					return favorites[sample.$id];
				});

				callback(filtered);

			});
		
		});

	}
	
	function getSamplesFromCategory(category){
		return $firebaseArray(database.ref("samples").orderByChild("category").equalTo(category));
	}

	function getUserFavoritesForSample(sampleId){
		return $firebaseObject(database.ref("samples/" + sampleId + "/favorites"));
	}

	function getSampleFile(category, id){
		return storage.ref().child("samples/" + category + "/" + id).getDownloadURL();
	}
	
	function getSampleCategories(){
		return $firebaseArray(database.ref("categories/"));
	}

	function getFiltersForCategory(category){
		return $firebaseObject(database.ref("filters/" + category));
	}

	function getFavoritesForUser(id){
		return $firebaseObject(database.ref("users/" + id + "/favorites"));
	}

	function sampleDataReference(){
		return $firebaseArray(database.ref("samples"));
	}

	function sampleStorageReference(id){
		return storage.ref().child("samples/" + id);
	}
}