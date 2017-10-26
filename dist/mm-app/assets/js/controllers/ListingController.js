

angular
	.module('mediaManager')
	.controller('ListingController', ['$scope', '$rootScope', 'APP_CONST', '$stateParams', '$timeout', 'DataFactory', '$log', 'growl', ListingController]);


function ListingController($scope, $rootScope, APP_CONST, $stateParams, $timeout, DataFactory, $log, growl){
	$scope.masterController.pageClass = 'page-images';
	$scope.masterController.OPEN_ID = $stateParams.id;

	$scope.showLoading = true;
	$scope.mediaLoaded = false;
	$scope.params = $stateParams;
	$scope.consts = APP_CONST;
	$scope.filterEnabled = false;
	$scope.addEnaled = false;
	$scope.mediaList = [];
	$scope.folderList = [];


	//Set Filters
	if(!angular.isUndefined($scope.params.filterType)){
		$scope.masterController.filter.type = $scope.params.filterType;
	}

	//Set Fileupload
	if(!angular.isUndefined($scope.params.selectMode)){
		$scope.masterController.OPEN_MODE = $scope.params.selectMode.toUpperCase().trim();
		$scope.masterController.fileupload.multiple = ($scope.masterController.OPEN_MODE == 'MULTIPLE' || $scope.masterController.OPEN_MODE == 'MANAGE')? true : false;
	}

	//Set Folder
	if(!angular.isUndefined($scope.params.selectFolder)){
		$scope.masterController.folders.selected = $scope.params.selectFolder;
	}

	//console.log($scope.params, $scope.masterController.filter, $scope.masterController.folders);


	$scope.getData = function(folder_id){
		$scope.showLoading = true;
		$scope.mediaLoaded = false;
		DataFactory.getMediaListing(folder_id).then(function(resp){
			$scope.mediaList = resp;

			$timeout(function() {
				$scope.showLoading = false;
				$scope.mediaLoaded = true;
			}, 500);	
			
			$scope.masterController.selected.items = [];
		}, function(error){
			growl.error('Error Getting Data [E1002]');
			$scope.showLoading = false;
			$scope.mediaLoaded = true;
		});
	}


	$scope.getFolders = function(){
		$scope.showLoading = true;
		DataFactory.getFolderList().then(function(resp){
			$scope.masterController.folders.list = resp;
			$scope.showLoading = false;	
		}, function(error){
			growl.error('Error Getting Folders [E1003]');
			$scope.showLoading = false;
		});
	}


	$scope.selectItem = function(e, item){
		if(item.selected){
			item.selected = false;
			var index = $scope.masterController.selected.items.indexOf(item);
			if(!angular.isUndefined(index)) $scope.masterController.selected.items.splice(index, 1);
			$scope.masterController.selected.text = ($scope.masterController.selected.items.length > 1)? 'Items Selected' : 'Item Selected';
		} else {
			if(($scope.masterController.OPEN_MODE == 'MULTIPLE' || $scope.masterController.OPEN_MODE == 'MANAGE') || $scope.masterController.selected.items.length < 1){
				item.selected = true;
				$scope.masterController.selected.items.push(item);
				$scope.masterController.selected.text = ($scope.masterController.selected.items.length > 1)? 'Items Selected' : 'Item Selected'; 

				if(e != null && e.shiftKey && $scope.masterController.selected.items.length > 1){
					
					var _prev = $scope.masterController.selected.items[$scope.masterController.selected.items.length - 2];
					$scope.doShiftSelect(_prev, item);
				}
			} 
		}	
		//return false;
	}


	$scope.doShiftSelect = function(startItem, endItem){
		var _start = '.media-item[data-id="'+startItem.id+'"]',
			_end = '.media-item[data-id="'+endItem.id+'"]';

		var items = ($(_end).isBefore(_start))? $(_end).nextUntil(_start) : $(_start).nextUntil(_end);

		if(items.length){
			$.each(items, function(idx, element){ 
				//console.log($(element).data().id);
				var _item = _.find($scope.mediaList, function(item){ return item.id == $(element).data().id; });

				$scope.selectItem(null, _item)
			});
		}
	}


	$scope.clearSelected = function(){
		_.each($scope.mediaList, function(item, index){
			item.selected = false;

			if((index + 1) == $scope.mediaList.length){
				$scope.masterController.selected.items = [];
			}
		});
	}

	$scope.buildEditorLink = function(item){
		var url = $scope.masterController.pixiePath+'?id='+item.id;
			url += '&folder='+$scope.masterController.folders.selected;
			url += '&name='+item.name.replace(' ', '_');
			url += '&ext='+item.ext;
			url += '&image_path='+window.encodeURIComponent(item.path);
			url += '&save_path='+window.encodeURIComponent($scope.consts.postPixieImageCreate);
			url += '&callback_path='+window.encodeURIComponent(updateQueryStringParameter(window.location.href, 'selectFolder', $scope.masterController.folders.selected));
		return url;
	}


	$scope.$on('FILEUPLOAD-COMPLETED', function(){
		growl.success('Changes Saved. Reloading Media List.');
		$scope.getData($scope.params.selectFolder);
		$scope.getFolders();
	});

	$scope.$on('MM-ITEMS-DELETED', function(e, data){
		//console.log(data);
		$scope.showLoading = true;
		DataFactory.postMediaDelete(data).then(function(){
			growl.success('Changes Saved. Reloading Media List.');
			$scope.getData($scope.params.selectFolder);
			$scope.getFolders();
		});
	});

	$scope.$on('VFILE-CREATE-REQUEST', function(){
		if($scope.masterController.addItems.virtualFile.name != ''){
			$scope.masterController.addItems.enabled = false;
			$scope.showLoading = true;

			DataFactory.postVirtualFile({
				id:$scope.masterController.OPEN_ID, 
				name:$scope.masterController.addItems.virtualFile.name, 
				type:$scope.masterController.addItems.virtualFile.type,
				targetFolder: ($scope.masterController.folders.selected == '' )? '0' : $scope.masterController.folders.selected
			}).then(function(){
				$scope.masterController.addItems.virtualFile.name = '';
				growl.success('Changes Saved. Reloading Media List.');
				$scope.getData($scope.params.selectFolder);
			});
		}
	});

	$scope.$on('MM-FOLDERS-ADD', sendFolderStructureUpdates);
	$scope.$on('MM-FOLDERS-EDIT', sendFolderStructureUpdates);
	$scope.$on('MM-FOLDERS-UPDATE', sendFolderStructureUpdates);
	$scope.$on('MM-FOLDERS-DELETE', sendFolderStructureUpdates);

	function sendFolderStructureUpdates(e, data){ console.log(data)
		DataFactory.postFolderSave(data).then(function(resp){
			resp = resp.data;
			if(resp.status == 'true'){
				if(data.type == 'ADD'){
					$scope.masterController.mmFolderInsertItem($scope.masterController.folders.list.items, data.id, data.parent, data.name, function(newItem){
						$scope.getFolders();
					});
				}

				if(data.type == 'DELETE'){
					$scope.masterController.mmFolderRemoveItem($scope.masterController.folders.list.items, data.id, function(){
						$scope.masterController.folders.selected = '0';
					});
				}

				growl.success('Changes Saved.');
			} else {
				growl.error(resp.message +' [XHR]');
			}

		}, function(){
			growl.error('Error Adding Folders [E2001]');
		});
	}

	$scope.$on('MM-FOLDERS-ONDROP', function(e, data){
		//console.log(data);
		if($scope.masterController.selected.items.length){

			_.each($scope.masterController.selected.items, function(item, index){
				item.folder = data.id;

				if((index + 1) == $scope.masterController.selected.items.length){
					DataFactory.postMediaUpdates($scope.masterController.selected.items).then(function(){
						$scope.clearSelected();
						$log.debug('Media Updates Posted');
					});
				}
			})

		} else {
			console.log('Nothing to Drop');
		}

	});


	$scope.$on('CLEAR-SELECTION', function(){
		$scope.clearSelected();
	});


	//Initialize
	$scope.getFolders();
	$scope.getData($scope.params.selectFolder);

}