

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

		_this.addItems = {
			enabled: false
		}

		_this.fileupload = {
			enabled: false,
			multiple: false,
			files: [],
			filesCompleted: 0,
			addFiles: function(files){
				if(files.length) {
					//Close Add Menu
					_this.addItems.enabled = false;
					_this.fileupload.enabled = true;

					_this.prepUpload(files).then(function(){
						//Broadcaste new files done
						$rootScope.$broadcast('FILEUPLOAD-COMPLETED');
					});
				}
				
				return false;
			}	
		}

		_this.prepUpload = function(files){
			var deferred = $q.defer();
			var filesLength = files.length;


			var checkProgress = function(){
				if(_this.fileupload.filesCompleted == filesLength) {
					deferred.resolve();
				}
			}	

			_this.fileupload.filesCompleted = 0;


			if(filesLength){
				_this.fileupload.files = files;

				for (var i = 0; i < filesLength; i++) {
					var file = _this.fileupload.files[i];
						file.progress = 0;
						file.error = false;
						file.errorMsg = false;
						file.success = false;
						file.sizeMB = (file.size / 1048576).toFixed(1) + ' MB '; // MB = 2^20 = 1,048,576 Bytes

						UploadFactory.upload(APP_CONST.fileuploadPath, file, i).then(function(resp){
							//console.log('s', resp)
							//console.log('s', _this.fileupload.files[resp.id])

							if(resp.data.status == 'true'){
								_this.fileupload.files[resp.id].success = true;
								_this.fileupload.files[resp.id].error = false;
							} else {
								_this.fileupload.files[resp.id].success = false;
								_this.fileupload.files[resp.id].error = true;
								_this.fileupload.files[resp.id].errorMsg = resp.data.message
							}

							_this.fileupload.filesCompleted ++;
							checkProgress();

						}, function(id, resp){
							_this.fileupload.files[resp.id].success = false;
							_this.fileupload.files[resp.id].error = true;
							_this.fileupload.files[resp.id].errorMsg = 'File Upload Error [E1001]'

							_this.fileupload.filesCompleted ++;
							checkProgress();

						}, function(resp){
							_this.fileupload.files[resp.id].progress = resp.complete;
						})

				}

			} else {
				deferred.reject();
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