//Route provider
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/index.html',
		controller: 'mainController'
	});
	$urlRouterProvider.otherwise('home');
}]);