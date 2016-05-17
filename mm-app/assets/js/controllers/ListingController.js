

angular
	.module('mediaManager')
	.controller('ListingController', ListingController);


function ListingController($scope, APP_CONST, $stateParams, $timeout, DataFactory, $log){
	$scope.masterController.pageClass = 'page-images';
	$scope.masterController.OPEN_ID = $stateParams.id;

	$scope.showLoading = true;
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
		console.log('Folder Pre Selection is disabled!!')
		//$scope.masterController.folders.selected = $scope.params.selectFolder;
	}

	//console.log($scope.params, $scope.masterController.filter, $scope.masterController.folders);


	$scope.getData = function(){
		DataFactory.getMediaListing().then(function(resp){
			//console.log(resp.data.items);
			$scope.mediaList = resp;	
			$scope.showLoading = false;
			
			$scope.masterController.selected.items = [];
		}, function(error){
			$scope.masterController.showTaost('Error Getting Data [E1002]', 10000);
			$scope.showLoading = false;
		});
	}


	$scope.getFolders = function(){
		DataFactory.getFolderList().then(function(resp){
			$scope.masterController.folders.list = resp;
			$scope.showLoading = false;	
		}, function(error){
			$scope.masterController.showTaost('Error Getting Folders [E1003]', 10000);
			$scope.showLoading = false;
		});
	}


	$scope.selectItem = function(item){
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
			} 
		}	
		return false;
	}


	$scope.clearSelected = function(){
		_.each($scope.mediaList, function(item, index){
			item.selected = false;

			if((index + 1) == $scope.mediaList.length){
				$scope.masterController.selected.items = [];
			}
		});
	}


	$scope.$on('FILEUPLOAD-COMPLETED', function(){
		$log.debug('Reloading Media List');
		$scope.getData();
	});

	$scope.$on('MM-ITEMS-DELETED', function(e, data){
		//console.log(data);
		$scope.showLoading = true;
		DataFactory.postMediaDelete(data).then(function(){
			$log.debug('Reloading Media List');
			$scope.getData();
		});
	});

	$scope.$on('VFILE-CREATE-REQUEST', function(){
		if($scope.masterController.addItems.virtualFile.name != ''){
			$scope.masterController.addItems.enabled = false;
			$scope.showLoading = true;

			DataFactory.postVirtualFile({
				id:$scope.masterController.OPEN_ID, 
				name:$scope.masterController.addItems.virtualFile.name, 
				type:$scope.masterController.addItems.virtualFile.type 
			}).then(function(){
				$log.debug('Reloading Media List');
				$scope.getData();
			});
		}
	});

	$scope.$on('MM-FOLDERS-ADD', sendFolderStructureUpdates);
	$scope.$on('MM-FOLDERS-EDIT', sendFolderStructureUpdates);
	$scope.$on('MM-FOLDERS-DELETE', sendFolderStructureUpdates);
	$scope.$on('MM-FOLDERS-UPDATE', sendFolderStructureUpdates);

	function sendFolderStructureUpdates(e, data){ console.log(JSON.stringify(data, 2, ' '))
		DataFactory.postFolderSave(data).then(function(){
			$log.debug('Folders changed logged!');
		}, function(){
			$scope.masterController.showTaost('Error Adding Folders [E2001]', 10000);
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

	//Initialize
	$scope.getFolders();
	$scope.getData();
}