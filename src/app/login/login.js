angular.module("verloren.login",['ui.router', 'verloren.auth'])

.config(function config($stateProvider){
	$stateProvider.state("login", {
		url: "/login",
		views: {
			"main": {
				controller: "loginController as vm",
				templateUrl: "login/login.tpl.html"
			}
		},
		data:{ pageTitle: 'Log in' }
	});
})

.controller("loginController", loginController);
loginController.$inject = ['authFactory', '$state'];

function loginController(authFactory, $state){
	var vm = this;

	var userNotFound = "auth/user-not-found";
	var invalidPassword = "auth/wrong-password";

	vm.submit = submit;

	function submit(){

		vm.emailError = "";
		vm.passwordError = "";

		authFactory.login(vm.email,vm.password).then(function(result){
			$state.go("sounds");
		})

		.catch(function(error){ 

			switch (error.code){
				case userNotFound:
					vm.emailError = "No user with this email";
					break;

				case invalidPassword:
					vm.passwordError = "The password was incorrect";
					break;
			} 
		});
	}
}