

angular
	.module('mediaManager')
	.controller('MasterController', MasterController);


function MasterController($scope, $rootScope, APP_CONST, $timeout, $q, UploadFactory){
	var _this = this;
		_this.APP_CONST = APP_CONST;
		_this.OPEN_ID = '';
		_this.$rootScope = $rootScope;
		_this.$timeout = $timeout;

		_this.selected = {
			text: '',
			items: []
		};

		_this.filter = {
			show: false,
			type: '',
			search: {
				enabled: false,
				string: ''
			}
		};

		_this.addItems = {
			enabled: false,
			virtualFile: {
				name: '',
				type: 'video',
				create: function(){
					$rootScope.$broadcast('VFILE-CREATE-REQUEST');
				}
			}
		}

		_this.toast = {
			message: ''
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
			}, 
			close: function(){
				_this.fileupload.enabled = false;
				$rootScope.$broadcast('FILEUPLOAD-CLOSED');
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



		_this.showInfo = function(){
			_this.showTaost(APP_CONST.restrictionMessage, 10000);
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
		action: 'select',
		items: items
	}
	parent.postMessage(JSON.stringify(obj), $this.APP_CONST.postmessageParent);
}

MasterController.prototype.deleteSelection = function(id, items){
	this.$rootScope.$broadcast('MM-ITEMS-DELETED', {id:id, items:items});
}

MasterController.prototype.showTaost = function(msg, duration){ console.log(msg)
	var $this = this;
		$this.toast.message = msg;
	var duration = angular.isUndefined(duration)? 3000: parseInt(duration);
	
	$this.$timeout(function(){
		$this.toast.message = '';
	}, duration);	
}