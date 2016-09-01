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

	vm.email = "";
	vm.password = "";

	vm.submit = submit;

	function submit(){
		authFactory.login(vm.email,vm.password).then(function(result){
			console.log(result);
			$state.go("sounds");
		});
	}
}