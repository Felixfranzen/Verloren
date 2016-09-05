angular.module("verloren.signup",['ui.router', 'verloren.auth'])

.config(function config($stateProvider){
	$stateProvider.state("signup", {
		url: "/signup",
		views: {
			"main": {
				controller: "signupController as vm",
				templateUrl: "signup/signup.tpl.html"
			}
		},
		data:{ pageTitle: 'Sign up' }
	});
})

.controller("signupController", signupController);
signupController.$inject = ["authFactory", "$state"];
function signupController(authFactory, $state){
	var vm = this;
	vm.submit = submit;

	function submit(){
		vm.errorMessage = "";

		if (vm.password === vm.repeatPassword){
			authFactory.signUp(vm.email, vm.password).then(function(user){
				$state.go("sounds.samples",{category:"loop"});
			
			}).catch(function(error){
				console.log(error)
				vm.errorMessage = error.message;
			})
		}
	}
}