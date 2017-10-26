angular
	.module('mediaManager')
	.controller('MasterController', ['$scope', '$rootScope', 'APP_CONST', '$timeout', '$q', 'UploadFactory', 'growl', '$base64', MasterController]);


function MasterController($scope, $rootScope, APP_CONST, $timeout, $q, UploadFactory, growl, $base64) {
	var _this = this;
	_this.version = APP_CONST.version;
	_this.APP_CONST = APP_CONST;
	_this.OPEN_ID = '';
	_this.OPEN_MODE = '';
	_this.ALLOWED_IMAGES = ['JPEG', 'JPG', 'GIF', 'PNG', 'BMP', 'TIFF', 'TIF', 'SVG', 'PDF'];
	_this.ALLOWED_VIDEOS = ['MP4', 'WEBM', 'AVI', 'MKV', 'WAV', 'WMV', 'OGG', 'OGV', 'FLV', 'MOV', '3GP', 'M4V'];
	_this.ALLOWED_AUDIOS = ['WAV', 'OGG', 'AAC', 'AC3', 'M4A', 'MP3'];
	_this.ALLOWED_FILES = ['HTML', 'HTM', 'PHP'];
	_this.ALLOWED_FILETYPES = _this.ALLOWED_IMAGES.concat(_this.ALLOWED_VIDEOS).concat(_this.ALLOWED_AUDIOS).concat(_this.ALLOWED_FILES);
	_this.transcoding = APP_CONST.transcoding;
	_this.$rootScope = $rootScope;
	_this.$timeout = $timeout;
	_this.firstLevelFilters = APP_CONST.firstLevelFilters;
	_this.pixiePath = 'pixie/index.php';


	_this.APP_CONST.restrictionMessage = 'Max file size allowed is ' + (_this.APP_CONST.maxUploadFileSize / 1048576).toFixed(0) + 'MB. ';
	_this.APP_CONST.restrictionMessage += '<br/>Allowed File Type: ';
	_.each(_this.ALLOWED_FILETYPES, function(ext, index) {
		var _del = ((index + 1) == _this.ALLOWED_FILETYPES.length) ? '' : ', ';
		_this.APP_CONST.restrictionMessage += ext + _del;
	})

	_this.listing = {
		layout: 'grid'
	}

	_this.selected = {
		text: '',
		items: []
	};

	_this.folders = {
		list: [],
		selected: '0',
		manager: {
			enabled: false,
			add: {
				string: '',
				focus: '0',
				submit: function(string, rooted) {
					if (angular.isUndefined(string) || string == '') {
						growl.error('Need a Folder Name');
						return false;
					}
					var newID = Math.floor(10 * Math.random()) + "" + (new Date).getTime();
					var selectedFolder = (rooted) ? _this.folders.manager.add.focus : _this.folders.selected;
						selectedFolder = (selectedFolder == '') ? '0' : selectedFolder;

					_this.$rootScope.$broadcast('MM-FOLDERS-ADD', {
						'id': newID,
						'name': string,
						'parent': selectedFolder,
						'struncture': _this.folders.list,
						type: 'ADD'
					});
					_this.folders.manager.add.string = '';

					if (rooted) _this.folders.manager.add.focus = '0';
				}
			},
			edit: function(id, name) {
				if (angular.isUndefined(name) || name == '') {
					growl.error('Need a Folder Name');
					return false;
				}
				_this.$rootScope.$broadcast('MM-FOLDERS-EDIT', {
					data: _this.folders.list,
					type: 'EDIT',
					id: id,
					name: name
				});
			},
			delete: function(id) {

				//_this.deleteConfirmation.confirm('folder', 1).then(function() {
					_this.$rootScope.$broadcast('MM-FOLDERS-DELETE', {
						data: _this.folders.list,
						type: 'DELETE',
						id: id
					});
				// 	_this.deleteConfirmation.close();
				// }, function() {
				// 	_this.deleteConfirmation.close();
				// });

			},
			ondrop: function(folder) {
				_this.$rootScope.$broadcast('MM-FOLDERS-ONDROP', {
					data: folder,
					type: 'ONDROP',
					id: folder.id
				});
			}
		},
		treeOptions: {
	    	dragStop: function(event) {
	      		//console.log(event);
	      		//console.log(JSON.stringify( _this.folders.list, 4, ' '));
				_this.$rootScope.$broadcast('MM-FOLDERS-UPDATE', {
					data: _this.folders.list,
					type: 'UPDATE'
				});
	    	}
	  	},
		/*sortableOptions: {
			connectWith: '.mm-folderList',
			stop: function(e, ui) {
				//if (this === ui.item.parent()[0]) {
				_this.$rootScope.$broadcast('MM-FOLDERS-UPDATE', {
					data: _this.folders.list,
					type: 'UPDATE'
				});
				//}
			}
		},
		getTemplate: function(item) {
			if (item) {
				//return 'mm-foldermanager-navtree.html';
				return 'mm-sidebar-navtree.html';
			}
			return null;
		},*/
		filterStrict: function(actual, expected) {
			if (expected === '') { //Handle All Media Option
				return true; //Angular will call the comparator function and pass in "expected" as expected and the element as "actual". So we say, if the expected or "expected" is empty, then match ALL elements (return true). Otherwise, perform a 'strict' object comparison.
			}
			return angular.equals(expected, actual);
		}
	}


	_this.filter = {
		show: true,
		type: '',
		search: {
			enabled: false,
			string: ''
		},
		orderBy: 'name',
		sortReverse: false,
		onclick: function(type) {
			_this.filter.type = (type == _this.filter.type) ? '' : type;
		}
	};

	_this.addItems = {
		enabled: false,
		virtualFile: {
			name: '',
			type: 'video',
			create: function() {
				$rootScope.$broadcast('VFILE-CREATE-REQUEST');
			}
		}
	}

	/*_this.toast = {
		message: ''
	}*/

	/*_this.deleteConfirmation = {
		//enabled: false,
		//title: 'Delete Media Items',
		//message: 'Warning: this cannot be undone.',
		items_length: 0,
		type: 'media',
		confirm: function(type, length) {
			//if (type == 'media') _this.deleteConfirmation.title = 'Delete Media Items';
			//if (type == 'folder') _this.deleteConfirmation.title = 'Delete Folder';

			//_this.deleteConfirmation.type = type;
			_this.deleteConfirmation.deferred = $q.defer();
			_this.deleteConfirmation.enabled = true;
			_this.deleteConfirmation.items_length = length;

			return _this.deleteConfirmation.deferred.promise;
		},
		close: function() {
			_this.deleteConfirmation.enabled = false;
			_this.deleteConfirmation.items_length = 0;
		}
	}*/

	_this.fileupload = {
		enabled: false,
		multiple: false,
		files: [],
		filesUploading: false,
		filesCompleted: 0,
		filesSuccessCount: 0,
		filesErrorCount: 0,
		addFiles: function(files) {
			if (files.length) {
				//Close Add Menu

				$timeout(function() {
					_this.addItems.enabled = false;
					_this.fileupload.enabled = true;

					_this.prepUpload(files);
				});
			}

			return false;
		},
		close: function() {
			_this.fileupload.enabled = false;
			_this.fileupload.files = [];
			$rootScope.$broadcast('FILEUPLOAD-CLOSED');
		},
		removeItem: function(item) {
			var index = _this.fileupload.files.indexOf(item);
			_this.fileupload.files.splice(index, 1);
		}
	}

	_this.prepUpload = function(files) {
		var filesLength = files.length;
		var _checkUploadProgress = function() {
			if (_this.fileupload.filesCompleted == filesLength) {
				deferred.resolve();
			}
		}

		_this.fileupload.filesCompleted = 0;
		_this.fileupload.filesSuccessCount = 0;
		_this.fileupload.filesErrorCount = 0;
		_this.fileupload.filesUploading = false;
		_this.fileupload.doneUploading = false;

		if (filesLength) {

			for (var i = 0; i < filesLength; i++) {
				var file = files[i];
				file.id = '00';
				file.progress = 0;
				file.processing = 0;
				file.done = false;
				file.error = false;
				file.errorMsg = false;
				file.success = false;
				file.sizeMB = (file.size / 1048576).toFixed(1) + ' MB '; // MB = 2^20 = 1,048,576 Bytes
				file.targetFolder = _this.folders.selected;

				var _ext = file.name.split('.').pop().toUpperCase();

				if (!_.contains(_this.ALLOWED_FILETYPES, _ext)) {
					file.error = true;
					file.done = true;
					file.errorMsg = 'This File Type (' + _ext + ') Not Allowed';
					_this.fileupload.filesErrorCount++;
				}

				if (file.size > _this.APP_CONST.maxUploadFileSize) {
					file.error = true;
					file.done = true;
					file.errorMsg = 'File too big (' + file.sizeMB + '), Max size ' + (_this.APP_CONST.maxUploadFileSize / 1048576).toFixed(0) + 'MB';
					_this.fileupload.filesErrorCount++;
				}

				_this.fileupload.files.push(file);
			}

		}
		return false;
	}


	_this.doUpload = function() {

		if (!_this.fileupload.files.length) {
			return false;
		}

		_this.fileupload.filesUploading = true;

		for (var i = 0; i < _this.fileupload.files.length; i++) {
			var file = _this.fileupload.files[i];
			file.id = i;

			if (!file.done) {

				UploadFactory.upload(APP_CONST.fileuploadPath + '?targetFolder=' + file.targetFolder, file, i).then(function(resp) {
					//console.log('s', resp)
					//console.log('s', _this.fileupload.files[resp.id])

					if (resp.data.status == 'true') {
						_this.fileupload.files[resp.id].error = false;
						_this.fileupload.files[resp.id].errorMsg = '';

						if (_this.transcoding) {
							var _dataString = $base64.encode(JSON.stringify(resp.data.data));
							new _checkTranscodeProgress(resp.id, resp.data.data.name_new, encodeURIComponent(_dataString));
						} else {
							_this.fileupload.files[resp.id].success = true;
							_this.fileupload.filesSuccessCount++;

							_this.fileupload.files[resp.id].done = true;
							_this.fileupload.filesCompleted++;
							_checkUploadProgress();
						}

					} else {
						_this.fileupload.files[resp.id].success = false;
						_this.fileupload.files[resp.id].error = true;
						_this.fileupload.files[resp.id].errorMsg = resp.data.message;

						_this.fileupload.filesErrorCount++;

						_this.fileupload.files[resp.id].done = true;
						_this.fileupload.filesCompleted++;
						_checkUploadProgress();
					}

				}, function(resp) {
					_this.fileupload.files[resp.id].success = false;
					_this.fileupload.files[resp.id].error = true;
					_this.fileupload.files[resp.id].errorMsg = 'File Upload Error [E1001]';
					_this.fileupload.files[resp.id].done = true;

					_this.fileupload.filesErrorCount++;
					_this.fileupload.filesCompleted++;
					_checkUploadProgress();

				}, function(resp) {
					_this.fileupload.files[resp.id].progress = resp.complete;
				});

			} else {
				_this.fileupload.filesCompleted++;
				_checkUploadProgress();
			}
		}

		return false;
	}



	_this.showInfo = function() {
		/*growl.info(APP_CONST.restrictionMessage, {
			ttl: 10000
		});*/

		swal({
			html: APP_CONST.restrictionMessage,
			width: 600,
			customClass: 'info-swal ico-info',
			showConfirmButton: false,
			showCloseButton: true,
			padding: 0
		});	
	}

	_this.showItemInfo = function(e, item){
		e.stopPropagation();
		//console.log(item);

		var _template = '<div>';

				if(item.type == 'image') _template += '<div class="media-prev image"><img src="'+item.thumbnails.orginal+'"/></div>';
				if(item.type == 'video') _template += '<div class="media-prev video"><video src="'+item.path+'" controls></video></div>';
				if(item.type == 'audio') _template += '<div class="media-prev audio"><audio src="'+item.path+'" controls></audio></div>';

				_template += '<div>';
					_template += '<div class="control-label">Name</div>';
					_template += '<div class="control-text">'+item.name+'</div>';
				_template += '</div>';
				_template += '<div class="row">';
					_template += '<div class="col-xs-6">';
						_template += '<div class="control-label">Size</div>';
						_template += '<div class="control-text">'+item.size+'</div>';
					_template += '</div>';

				if(item.type != 'audio'){		
					_template += '<div class="col-xs-6">';
						_template += '<div class="control-label">Dimension</div>';
						_template += '<div class="control-text">'+item.width+' by '+item.height+'</div>';
					_template += '</div>';
				}

				_template += '</div>';
				_template += '<div>';
					_template += '<div class="control-label">Created</div>';
					_template += '<div class="control-text">'+item.create_date+'</div>';
				_template += '</div>';
				_template += '<div class="text-center">';
					_template += '<a href="'+item.path_download+'" target="_blank" class="btn btn-link btn-swal" download="'+item.name+'">Download</a>';
				_template += '</div>';
			_template += '</div>';

		swal({
			html: _template,
			confirmButtonClass: 'btn btn-link',
			buttonsStyling: false,
			width: 600,
			customClass: 'info-swal ico-info',
			showConfirmButton: false,
			showCloseButton: true,
			padding: 0,
			allowEnterKey: false,
		}).catch(swal.noop);
	}


	function _checkUploadProgress() {
		if (_this.fileupload.filesCompleted == _this.fileupload.files.length) {
			_this.fileupload.filesUploading = false;
			_this.fileupload.doneUploading = true;

			//Broadcaste new files done
			$rootScope.$broadcast('FILEUPLOAD-COMPLETED');
		}
	}

	function _checkTranscodeProgress(id, filename, data_node) {

		UploadFactory.getTranscodeProgress(APP_CONST.getTranscodingProgress, filename, data_node).then(function(resp) {
			console.log('s', resp);
			//resp.data = (typeof resp.data == 'object')? resp.data : JSON.parse(resp.data);

			if (resp.status == 'true') {
				//console.log(id, resp.data.data.progress);
				_this.fileupload.files[id].processing = resp.data.progress;

				if (resp.data.progress == 100) {
					_this.fileupload.files[id].success = true;
					_this.fileupload.filesSuccessCount++;
					//console.log('Transcode Done:', filename);

					_this.fileupload.files[id].done = true;
					_this.fileupload.filesCompleted++;
					_checkUploadProgress();
				} else {
					setTimeout(function() {
						_checkTranscodeProgress(id, filename, data_node);
					}, 1000);
				}


			} else {
				_this.fileupload.files[id].error = true;
				_this.fileupload.files[id].errorMsg = resp.message;
				_this.fileupload.files[id].processing = 100;

				_this.fileupload.filesErrorCount++;
				_this.fileupload.filesCompleted++;
				_checkUploadProgress();
			}


		}, function(resp) {
			//console.log('e', id, filename, resp);
			_this.fileupload.files[id].processing = 100;
			_this.fileupload.files[id].error = true;

			_this.fileupload.filesErrorCount++;
			_this.fileupload.filesCompleted++;
			_checkUploadProgress();
		});
	}


	_this.clearSelected = function(){
		$rootScope.$broadcast('CLEAR-SELECTION');
	}

}

MasterController.prototype.closeMessage = function(id) {
	var $this = this;
	var obj = {
		id: id,
		action: 'close'
	}
	parent.postMessage(JSON.stringify(obj), $this.APP_CONST.postmessageParent);
}

MasterController.prototype.makeSelection = function(id, items) {
	var $this = this;
	var obj = {
		id: id,
		action: 'select',
		items: items
	}
	parent.postMessage(JSON.stringify(obj), $this.APP_CONST.postmessageParent);
}

MasterController.prototype.deleteSelection = function(e, id, items) {
	e.stopPropagation();

	var $this = this;
	var str_item = (items.length > 1)? 'items' : 'item';
	var _template = '<div class="dc-content">'
			_template += '<h3>Warning: this cannot be undone.</h3>';
			_template += '<div class="checkedbox checked"> You have selected '+items.length+' '+str_item+'.</div>';
			_template += '<div class="checkedbox checked"> Selected media '+str_item+' will be <strong>permenantly deleted</strong>.</div>';
			_template += '<div class="checkedbox checked"> All content linked to the item will be <strong>broken</strong>.</div>';
		_template += '</div>';

	swal({
		title: 'Delete Media',
		html: _template,
		showCancelButton: true,
		cancelButtonClass: 'btn btn-link pull-left btn-swal',
		reverseButtons: true,
		buttonsStyling: false,
		customClass: 'info-swal ico-remove',
		confirmButtonClass: 'btn btn-danger btn-swal',
		confirmButtonText: 'Yes, Delete it!',
		width: 700,
		allowEnterKey: false,
	}).then(function () {
		$this.$rootScope.$broadcast('MM-ITEMS-DELETED', {
			id: id,
			items: items
		});
	}).catch(swal.noop);

	/*$this.deleteConfirmation.confirm('media', items.length).then(function() {
		$this.deleteConfirmation.close();
	}, function() {
		$this.deleteConfirmation.close();
	});*/
	return false;
}

MasterController.prototype.getPixieLink = function(type) {
	var $this = this;
	var URL = $this.pixiePath + '?id=000';
	URL += '&folder=' + $this.folders.selected;
	URL += '&name=New_Image';
	URL += '&ext=png';
	URL += '&image_path=';
	URL += '&save_path=' + window.encodeURIComponent($this.APP_CONST.postPixieImageCreate);
	URL += '&callback_path=' + window.encodeURIComponent(updateQueryStringParameter(window.location.href, 'selectFolder', $this.folders.selected));
	return URL;
}

/*MasterController.prototype.showTaost = function(msg, duration){
	var $this = this;
		$this.toast.message = msg;
	var duration = angular.isUndefined(duration)? 3000: parseInt(duration);
	
	$this.$timeout(function(){
		$this.toast.message = '';
	}, duration);	
}*/


MasterController.prototype.mmFolderInsertItem = function(collection, id, targetId, name, callback) {
	var $this = this;

	if (targetId == "0") {

		var newObj = {
			"id": id,
			"name": name,
			"items": []
		}

		collection.push(newObj);

		if (typeof callback == 'function') callback(newObj);

	} else {

		_.each(collection, function(item) {

			if (item.id == targetId) {
				var newObj = {
					"id": id,
					"name": name,
					"items": []
				}

				item.items.push(newObj);

				if (typeof callback == 'function') callback(newObj);

			} else { //console.log(item)
				if (item.items.length) {
					$this.mmFolderInsertItem(item.items, id, targetId, name, callback);
				}
			}

		});

	}


	return null;
}

MasterController.prototype.mmFolderRemoveItem = function(collection, targetId, callback) {
	var $this = this;

	_.each(collection, function(item) {

		if (!angular.isUndefined(item)) {

			if (item.id == targetId) {

				///console.log('found haha', collection, item, _.indexOf(collection, item));

				collection.splice(_.indexOf(collection, item), 1);

				if (typeof callback == 'function') callback();

			} else {
				if (item.items.length) {
					$this.mmFolderRemoveItem(item.items, targetId, callback);
				}
			}

		}

	});



	return null;
}

//http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
function updateQueryStringParameter(uri, key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	} else {
		return uri + separator + key + "=" + value;
	}
}