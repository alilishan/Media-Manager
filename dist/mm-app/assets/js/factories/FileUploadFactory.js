
angular
	.module('mediaManager')
	.factory('UploadFactory', FileUploadFactory);


//New X file
function FileUploadFactory($q, $rootScope, $http){

	this.upload = function(url, file, id) {
		var deferred = $q.defer(),
			xhr = new XMLHttpRequest(),
			upload = xhr.upload;
			
			upload.addEventListener("progress", function(event){
				if (event.lengthComputable) {
					var complete = (event.loaded / event.total * 100 | 0);
					deferred.notify({id: id, complete:complete}); 
				}
			}, false);

			xhr.onreadystatechange = function(r) { 
				if (4 === this.readyState) {
					if (xhr.status == 200) {
						$rootScope.$apply(function() {
							deferred.resolve({id: id, data:JSON.parse(xhr.response)});  
						});
					} else {
						$rootScope.$apply(function() {
							deferred.reject({id: id, data:JSON.parse(xhr.response)});  
						});
					}
				}
			}

		try	{
			xhr.open("POST", url, true);
			xhr.setRequestHeader("X-FILENAME", file.name);
			xhr.send(file);
		} catch(e) {
			deferred.reject({id: id, data:{id: id, message: 'XHR Error. Check Console'}});
			console.log(e);
		}


		return deferred.promise;
	};

	var mock = {}
	this.getTranscodeProgress = function(url, filename, data_node){
		var deferred = $q.defer();

			/*setTimeout(function() {
				if(filename in mock) {
					mock[filename].data.data.progress = mock[filename].data.data.progress + 10;
					deferred.resolve(mock[filename]);
				} else {
					mock[filename] = {
						data: {
							status: 'true',
							message: 'Tranoding failed',
							data: {
								progress: 10
							}
						}
					}
					
					deferred.resolve(mock[filename]);
				}
			}, 500);*/

			$http({
				url: url,
				method: 'GET',
				params: {
					filename: filename,
					data: data_node
				}
			}).then(function(resp){
				if(resp.status == 200 && resp.statusText == 'OK'){
					deferred.resolve(resp.data);
				} else {
					deferred.reject(resp);
				}
			}, function(e){
				deferred.reject(e);
			});

		return deferred.promise;
	};
	
	return this;
}

//FormData
/*function FileUploadFactory($q, $rootScope){
	this.upload = function(url, file, id) {
		var deferred = $q.defer(),
			formdata = new FormData(),
			xhr = new XMLHttpRequest(),
			upload = xhr.upload;
			
			upload.addEventListener("progress", function(event){
				if (event.lengthComputable) {
					var complete = (event.loaded / event.total * 100 | 0);
					deferred.notify({id: id, complete:complete}); 
				}
			}, false);

			formdata.append('file', file);

			xhr.onreadystatechange = function(r) {
				if (4 === this.readyState) {
					if (xhr.status == 200) {
						$rootScope.$apply(function() {
							deferred.resolve({id: id, data:JSON.parse(xhr.response)});  
						});
					} else {
						$rootScope.$apply(function() {
							deferred.reject({id: id, data:JSON.parse(xhr.response)});  
						});xhr
					}
				}
			}
		xhr.open("POST", url, true);
		xhr.send(formdata);
		return deferred.promise;
	};
	return this;
}*/