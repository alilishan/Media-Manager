
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

		factory.postNewFolder = function(dataObj){
			return $http.post(APP_CONST.postFolderAdd, dataObj);
		}

		factory.postEditFolder = function(dataObj){
			return $http.post(APP_CONST.postFolderEdit, dataObj);
		}

		factory.postDeleteFolder = function(dataObj){
			return $http.post(APP_CONST.postFolderDelete, dataObj);
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
				deferred.resolve(resp.data.items);
			}, function(){
				deferred.reject();
			});

			return deferred.promise;
		}		

	return factory;
}