
angular
	.module('mediaManager')
	.factory('UploadFactory', FileUploadFactory);


function FileUploadFactory($q, $rootScope){
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
}