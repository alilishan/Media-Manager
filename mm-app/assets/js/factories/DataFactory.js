
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

		factory.postMediaUpdates = function(dataObj){
			return $http.post(APP_CONST.postMediaUpdates, dataObj);
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
				if('status' in resp.data){
					if(resp.data.status == 'true'){
						deferred.resolve(resp.data.data.folders);
					} else {
						deferred.reject(resp.data.message);
					}
				} else {
					deferred.resolve(resp.data.folders);
				}
			}, function(){
				deferred.reject();
			});

			return deferred.promise;			
		}

		factory.getMediaListing = function(folder_id){
			var deferred = $q.defer();

			$http.get(APP_CONST.getMediaListing+'?folder_id='+folder_id).then(function(resp){
				if('status' in resp.data){
					if(resp.data.status == 'true'){
						deferred.resolve(resp.data.data.media);
					} else {
						deferred.reject(resp.data.message);
					}
				} else {
					deferred.resolve(resp.data.media);
				}
			}, function(){
				deferred.reject();
			});

			return deferred.promise;
		}		

	return factory;
}