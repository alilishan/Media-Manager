

angular
	.module('mediaManager')
	.controller('MasterController', MasterController);


function MasterController($scope, $rootScope, APP_CONST, $timeout, $q, UploadFactory){
	var _this = this;
		_this.version = APP_CONST.version;
		_this.APP_CONST = APP_CONST;
		_this.OPEN_ID = '';
		_this.OPEN_MODE = '';
		_this.$rootScope = $rootScope;
		_this.$timeout = $timeout;
		_this.firstLevelFilters = APP_CONST.firstLevelFilters;
		_this.pixiePath = 'pixie/index.php';

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
						var newID = Math.floor(10*Math.random())+""+(new Date).getTime();
						var selectedFolder = (rooted)? _this.folders.manager.add.focus : _this.folders.selected;
							selectedFolder = (selectedFolder == '')? '0' : selectedFolder;

						_this.$rootScope.$broadcast('MM-FOLDERS-ADD', {'id': newID,'name': string, 'parent': selectedFolder, 'struncture': _this.folders.list, type: 'ADD'});
						_this.folders.manager.add.string = '';

						if(rooted) _this.folders.manager.add.focus = '0';
					}
				},
				edit: function(id, name){
					if(angular.isUndefined(name) || name == ''){
						_this.showTaost('Need a Folder Name');
						return false;
					}
					_this.$rootScope.$broadcast('MM-FOLDERS-EDIT', {data: _this.folders.list, type: 'EDIT', id: id, name: name});
				},
				delete: function(id){ 

					_this.deleteConfirmation.confirm('folder', 1).then(function(){
						_this.$rootScope.$broadcast('MM-FOLDERS-DELETE', {data: _this.folders.list, type: 'DELETE', id: id});
						_this.deleteConfirmation.close();
					}, function(){
						_this.deleteConfirmation.close();
					});

				},
				ondrop: function(folder){
					_this.$rootScope.$broadcast('MM-FOLDERS-ONDROP', {data: folder, type: 'ONDROP', id: folder.id});
				}
			},
			sortableOptions: {
				connectWith: '.mm-folderList',
				stop: function(e, ui) {
					//if (this === ui.item.parent()[0]) {
						_this.$rootScope.$broadcast('MM-FOLDERS-UPDATE', {data: _this.folders.list, type: 'UPDATE'});
					//}
				}
			},
			getTemplate: function(item){
				if (item) { return 'mm-foldermanager-navtree.html'; }
				return null;
			},
			filterStrict: function (actual, expected) {
				if (expected === '') { 	//Handle All Media Option
					return true;		//Angular will call the comparator function and pass in "expected" as expected and the element as "actual". So we say, if the expected or "expected" is empty, then match ALL elements (return true). Otherwise, perform a 'strict' object comparison.
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

		_this.deleteConfirmation = {
			enabled: false,
			title: 'Delete Media Items',
			message: 'Warning: this cannot be undone.',
			items_length: 0,
			type: 'media',
			confirm: function(type, length){
				if(type == 'media') _this.deleteConfirmation.title = 'Delete Media Items';
				if(type == 'folder') _this.deleteConfirmation.title = 'Delete Folder';
				
				_this.deleteConfirmation.type = type;
				_this.deleteConfirmation.deferred = $q.defer();
				_this.deleteConfirmation.enabled = true;
				_this.deleteConfirmation.items_length = length;
				return _this.deleteConfirmation.deferred.promise;
			},
			close: function(){
				_this.deleteConfirmation.enabled = false;
				_this.deleteConfirmation.items_length = 0;
			}
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

						UploadFactory.upload(APP_CONST.fileuploadPath+'?targetFolder='+file.targetFolder, file, i).then(function(resp){
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
	var $this = this;

	$this.deleteConfirmation.confirm('media', items.length).then(function(){
		$this.$rootScope.$broadcast('MM-ITEMS-DELETED', {id:id, items:items});
		$this.deleteConfirmation.close();
	}, function(){
		$this.deleteConfirmation.close();
	});

}

MasterController.prototype.getPixieLink = function(type){ 
	var $this = this;
	var URL = $this.pixiePath+'?id=000';
		URL += '&folder='+$this.folders.selected;
		URL += '&name=New_Image';
		URL += '&ext=png';
		URL += '&image_path=';
		URL += '&save_path='+window.encodeURIComponent($this.APP_CONST.postPixieImageCreate);
		URL += '&callback_path='+window.encodeURIComponent(updateQueryStringParameter(window.location.href, 'selectFolder', $this.folders.selected));
	return URL;		
}

MasterController.prototype.showTaost = function(msg, duration){
	var $this = this;
		$this.toast.message = msg;
	var duration = angular.isUndefined(duration)? 3000: parseInt(duration);
	
	$this.$timeout(function(){
		$this.toast.message = '';
	}, duration);	
}


MasterController.prototype.mmFolderInsertItem = function(collection, id, targetId, name, callback) {
	var $this = this;

	if(targetId == "0"){

		var newObj = {
			"id": id,
			"name": name,
			"items": []
		}

		collection.push(newObj);

		if(typeof callback == 'function') callback(newObj);

	} else {

		_.each(collection, function(item){

			if(item.id == targetId) {
				var newObj = {
					"id": id,
					"name": name,
					"items": []
				}

				item.items.push(newObj);

				if(typeof callback == 'function') callback(newObj);

			} else { //console.log(item)
				if(item.items.length){
					$this.mmFolderInsertItem(item.items, id, targetId, name, callback);
				}
			}

		});

	}


	return null;
}

MasterController.prototype.mmFolderRemoveItem = function(collection, targetId, callback) {
	var $this = this;
	
	_.each(collection, function(item){

		if(!angular.isUndefined(item)){

			if(item.id == targetId) {
				
				///console.log('found haha', collection, item, _.indexOf(collection, item));

				collection.splice(_.indexOf(collection, item), 1);

				if(typeof callback == 'function') callback();

			} else {
				if(item.items.length){
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
  }
  else {
    return uri + separator + key + "=" + value;
  }
}