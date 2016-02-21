

angular
    .module('mediaManager')
    .config(RouterConfigurations);


function RouterConfigurations ($stateProvider, $urlRouterProvider){
	$stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/app-main.html',
        })

        .state('app.listing', {
            url: '/listing?id?selectMode?filterType',
            views: {
                'app-content': {
                    templateUrl: 'views/app-listing.html',
                    controller: 'ListingController'
                }
            }
        })
/*
		.state('app.speakers', {
            url: '/speakers',
            views: {
                'app-content': {
                    templateUrl: 'views/app-speakers.html',
                    controller: 'SpeakersController'
                }
            }
        })

        .state('app.slider', {
            url: '/slider/:id?type',
            views: {
                'app-content': {
                    templateUrl: 'views/app-slider.html',
                    controller: 'SliderController'
                }
            }
        })

        .state('app.demo', {
            url: '/demo',
            views: {
                'app-content': {
                    templateUrl: 'views/app-demo.html',
                    controller: 'DemoController'
                }
            }
        })

        .state('app.double', {
            url: '/double',
            views: {
                'app-content': {
                    templateUrl: 'views/app-double.html',
                    controller: 'ViewDoubleController'
                }
            }
        })

        .state('app.double.one', {
            url: '/one?event_id?slider_id',
            views: {
                'view-one': {
                    templateUrl: 'views/app-events.html',
                    controller: 'EventsController'
                },
                'view-two': {
                    templateUrl: 'views/app-slider.html',
                    controller: 'SliderController'
                }
            }
        });*/

    $urlRouterProvider.otherwise('/app/images');
}