angular.module("verloren.auth", ['firebase'])
.factory("authFactory", authFactory);

authFactory.$inject = ["$firebaseAuth"];
function authFactory($firebaseAuth){
	var auth = $firebaseAuth();

	return {
		signUp: signUp,
		login: login,
		logout: logout,
		onAuthChange: onAuthChange,
		requireSignIn: requireSignIn
	};

	function signUp(email,pass){
		return auth.$createUserWithEmailAndPassword(email,pass);
	}

	function login(email,pass){
		return auth.$signInWithEmailAndPassword(email,pass);
	}

	function logout(){
		return auth.$signOut();
	}

	function onAuthChange(callback){
		return auth.$onAuthStateChanged(callback);
	}

	function requireSignIn(){
		return auth.$requireSignIn();
	}
}