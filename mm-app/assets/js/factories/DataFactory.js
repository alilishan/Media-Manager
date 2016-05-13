
angular
	.module('mediaManager')
	.factory('DataFactory', DataFactory);


function DataFactory($http, APP_CONST, $q){
	var factory = {};

		// factory.getMediaListing = function(){
		// 	return $http.get(APP_CONST.getMediaListing);
		// }

		factory.postMediaDelete = function(dataObj){
			return $http.post(APP_CONST.postMediaDelete, dataObj);
		}

		factory.postVirtualFile = function(dataObj){
			return $http.post(APP_CONST.postVirtualFile, dataObj);
		}

		factory.postFolderSave = function(dataObj){
			return $http.post(APP_CONST.postFolderSave, dataObj);
		}

		factory.getFolderList = function(){
			var deferred = $q.defer();

			$http.get(APP_CONST.getMediaListing).then(function(resp){
				deferred.resolve(resp.data.folders);
			}, function(){
				deferred.reject();
			});

			return deferred.promise;			
		}

		factory.getMediaListing = function(){
			var deferred = $q.defer();

			$http.get(APP_CONST.getMediaListing).then(function(resp){
				deferred.resolve(resp.data.media);
			}, function(){
				deferred.reject();
			});

			return deferred.promise;
		}		

	return factory;
}