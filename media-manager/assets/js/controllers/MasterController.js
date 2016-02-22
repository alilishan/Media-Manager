

angular
	.module('mediaManager')
	.controller('MasterController', MasterController);


function MasterController($scope, $rootScope, APP_CONST, $timeout, $q, UploadFactory){
	var _this = this;
		_this.APP_CONST = APP_CONST;
		_this.open_id = '';

		_this.selected = {
			text: '',
			items: []
		};

		_this.filter = {
			show: false,
			type: 'all'
		};

		_this.fileupload = {
			multiple: false,
			files: [],
			filesLength: 0,
			addFiles: function(files){
				if(files.length) {
					$scope.prepUpload(files).then(function(){
						//Broadcaste new files done
						console.log('DONE')
					});
				}
				
				return false;
			}	
		}

		$scope.prepUpload = function(files){
			var deferred = $q.defer();
			var filesLength = files.length,
				filesCompleted = 0,
				callbackCount = 0;

			var checkProgress = function(){
				if(filesCompleted == filesLength) {
					deferred.resolve();
				}
			}	


			if(filesLength){
				_this.fileupload.files = files;

				for (var i = 0; i < filesLength; i++) {
					var file = _this.fileupload.files[i];
						file.progress = 0;
						file.error = false;
						file.success = false;

						UploadFactory.upload(APP_CONST.fileuploadPath, file, i).then(function(resp){
							//console.log('s', resp)
							//console.log('s', _this.fileupload.files[resp.id])

							if(resp.data.status == 'true'){
								_this.fileupload.files[resp.id].success = true;
								_this.fileupload.files[resp.id].error = false;
							} else {
								_this.fileupload.files[resp.id].success = false;
								_this.fileupload.files[resp.id].error = true;
							}

							filesCompleted ++;
							checkProgress();

						}, function(id, resp){
							_this.fileupload.files[resp.id].success = false;
							_this.fileupload.files[resp.id].error = true;

							filesCompleted ++;
							checkProgress();

						}, function(resp){
							_this.fileupload.files[resp.id].progress = resp.complete;
						})

				}

			}	

			return deferred.promise;
		}	
	
}

MasterController.prototype.closeMessage = function(id){
	var $this = this;
	var obj = {
		id: id,
		action: 'close'
	}
	parent.postMessage(JSON.stringify(obj), $this.APP_CONST.postmessageParent);
}

MasterController.prototype.makeSelection = function(id, items){
	var $this = this;
	var obj = {
		id: id,
		url: '',
		action: 'select',
		items: items
	}
	parent.postMessage(JSON.stringify(obj), $this.APP_CONST.postmessageParent);
}

MasterController.prototype.modifyTheme = function(data){
	less.modifyVars({
		'@themeColor': data.color
	});
}