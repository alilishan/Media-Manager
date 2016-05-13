

angular
	.module('mediaManager')
	.controller('MasterController', MasterController);


function MasterController($scope, $rootScope, APP_CONST, $timeout, $q, UploadFactory){
	var _this = this;
		_this.APP_CONST = APP_CONST;
		_this.OPEN_ID = '';
		_this.$rootScope = $rootScope;
		_this.$timeout = $timeout;
		_this.firstLevelFilters = APP_CONST.firstLevelFilters;

		_this.selected = {
			text: '',
			items: []
		};

		_this.folders = {
			list:[],
			selected: '0',
			manager: {
				enabled: false,
				add: {
					string: '',
					focus: '0',
					submit: function(string, rooted){
						if(angular.isUndefined(string) || string == ''){
							_this.showTaost('Need a Folder Name');
							return false;
						}

						var selectedFolder = (rooted)? _this.folders.manager.add.focus : _this.folders.selected;

						mmInsertItem(_this.folders.list.items, selectedFolder, string, function(newItem){
							_this.$rootScope.$broadcast('MM-FOLDERS-ADD', _this.folders.list);
							_this.folders.manager.add.string = '';

							if(rooted) _this.folders.manager.add.focus = '0';
						});
					}
				},
				edit: function(id, name){
					if(angular.isUndefined(name) || name == ''){
						_this.showTaost('Need a Folder Name');
						return false;
					}
					_this.$rootScope.$broadcast('MM-FOLDERS-EDIT', _this.folders.list);
				},
				delete: function(id){
					mmRemoveItem(_this.folders.list.items, id, function(){
						_this.$rootScope.$broadcast('MM-FOLDERS-DELETE', _this.folders.list);
					});
				}
			},
			sortableOptions: {
				connectWith: '.mm-folderList',
				update: function(e, ui) {
					if (this === ui.item.parent()[0]) {
						_this.$rootScope.$broadcast('MM-FOLDERS-UPDATE', _this.folders.list);
					}
				}
			},
			getTemplate: function(item){
				if (item) { return 'mm-foldermanager-navtree.html'; }
				return null;
			}
		}

		_this.filter = {
			show: true,
			type: '',
			search: {
				enabled: false,
				string: ''
			},
			onclick: function(type){
				_this.filter.type = (type == _this.filter.type)? '' : type;
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
			filesSuccessCount: 0,
			filesErrorCount: 0,
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
			_this.fileupload.filesSuccessCount = 0;
			_this.fileupload.filesErrorCount = 0;

			if(filesLength){
				_this.fileupload.files = files;

				for (var i = 0; i < filesLength; i++) {
					var file = _this.fileupload.files[i];
						file.progress = 0;
						file.error = false;
						file.errorMsg = false;
						file.success = false;
						file.sizeMB = (file.size / 1048576).toFixed(1) + ' MB '; // MB = 2^20 = 1,048,576 Bytes
						file.targetFolder = _this.folders.selected;

						UploadFactory.upload(APP_CONST.fileuploadPath, file, i).then(function(resp){
							//console.log('s', resp)
							//console.log('s', _this.fileupload.files[resp.id])

							if(resp.data.status == 'true'){
								_this.fileupload.files[resp.id].success = true;
								_this.fileupload.files[resp.id].error = false;
								
								_this.fileupload.filesSuccessCount ++;
							} else {
								_this.fileupload.files[resp.id].success = false;
								_this.fileupload.files[resp.id].error = true;
								_this.fileupload.files[resp.id].errorMsg = resp.data.message;

								_this.fileupload.filesErrorCount ++;
							}

							_this.fileupload.filesCompleted ++;
							checkProgress();

						}, function(id, resp){
							_this.fileupload.files[resp.id].success = false;
							_this.fileupload.files[resp.id].error = true;
							_this.fileupload.files[resp.id].errorMsg = 'File Upload Error [E1001]';

							_this.fileupload.filesErrorCount ++;
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


function mmInsertItem(collection, targetId, name, callback) {

	if(targetId == "0"){

		var newObj = {
			"id": Math.floor(10*Math.random())+""+(new Date).getTime(),
			"name": name,
			"items": []
		}

		collection.push(newObj);

		if(typeof callback == 'function') callback(newObj);

	} else {

		_.each(collection, function(item){

			if(item.id == targetId) {
				var newObj = {
					"id": Math.floor(10*Math.random())+""+(new Date).getTime(),
					"name": name,
					"items": []
				}

				item.items.push(newObj);

				if(typeof callback == 'function') callback(newObj);

			} else {
				if(item.items.length){
					mmInsertItem(item.items, targetId, name, callback);
				}
			}

		});

	}


	return null;
}

function mmRemoveItem(collection, targetId, callback) {

	_.each(collection, function(item){

			if(item.hasOwnProperty('id') && item.id == targetId) {
				
				console.log('found haha', collection, item, _.indexOf(collection, item));

				collection.splice(_.indexOf(collection, item), 1);

				if(typeof callback == 'function') callback();

			} else {
				if(item.items.length){
					mmRemoveItem(item.items, targetId, callback);
				}
			}

		});



	return null;
}
