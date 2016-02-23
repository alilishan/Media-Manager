
angular
	.module('mediaManager')
	.factory('DataFactory', DataFactory);


function DataFactory($http, APP_CONST){
	var factory = {};

		factory.getMediaListing = function(){
			return $http.get(APP_CONST.getMediaListing);
		}

		factory.postMediaDelete = function(dataObj){
			return $http.post(APP_CONST.postMediaDelete, dataObj);
		}

		factory.postVirtualFile = function(dataObj){
			return $http.post(APP_CONST.postVirtualFile, dataObj);
		}		

	return factory;
}