

angular
    .module('mediaManager')
    .config(['$stateProvider', '$urlRouterProvider', RouterConfigurations]);


function RouterConfigurations ($stateProvider, $urlRouterProvider){
	$stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/app-main.html',
        })

        .state('app.listing', {
            url: '/listing?id?selectMode?filterType?selectFolder',
            views: {
                'app-content': {
                    templateUrl: 'views/app-listing.html',
                    controller: 'ListingController'
                },
                'app-sidebar': {
                    templateUrl: 'views/app-sidebar.html',
                    controller: 'SidebarController'
                },
                'app-filter': {
                    templateUrl: 'views/app-filter.html'  
                }
            }
        })

    $urlRouterProvider.otherwise('/app/images');
}