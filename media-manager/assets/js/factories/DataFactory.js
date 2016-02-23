
angular
	.module('mediaManager')
	.factory('DataFactory', DataFactory);


function DataFactory($http, $q, APP_CONST){
	var factory = {};

		factory.getMediaListing = function(){
			return $http.get(APP_CONST.getMediaListing);
		}

	return factory;
}