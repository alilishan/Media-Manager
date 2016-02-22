

angular
	.module('mediaManager')
	.controller('ListingController', ListingController);


function ListingController($scope, APP_CONST, $stateParams, $timeout){
	$scope.masterController.pageClass = 'page-images';
	$scope.masterController.open_id = $stateParams.id;

	$scope.params = $stateParams;
	$scope.consts = APP_CONST;
	$scope.filterEnabled = false;

	//Set Filters
	if(!angular.isUndefined($scope.params.filterType)){
		$scope.masterController.filter.type = $scope.params.filterType;
	}

	//Set Fileupload
	if(!angular.isUndefined($scope.params.selectMode)){
		$scope.masterController.fileupload.multiple = ($scope.params.selectMode == 'multiple')? true : false;
	}

	console.log($scope.params, $scope.masterController.filter)

	// $scope.sendMessage = function(){
	// 	var obj = {
	// 		id: $stateParams.id,
	// 		url: '',
	// 		action: 'select'
	// 	}
	// 	parent.postMessage(JSON.stringify(obj), APP_CONST.postmessageParent);
	// }

	$scope.mediaList = [
		{
			id: '1',
			name: 'Motorbike', selected: false,
			type: 'image', width: '1080px', height: '1920px', ext: 'png',
			url: 'http://rs1225.pbsrc.com/albums/ee388/joinedbro/JB%20Web%20SIte%20Blog/JBHDWallpapers2.jpg~c200'
		}, 
		{
			id: '2',
			name: 'Lone blue Tree', selected: false,
			type: 'video', width: '1080px', height: '1920px', ext: 'png',
			url: 'http://www.3dwallpapersonline.com/wp-content/uploads/2015/12/Winter-HD-Wallpapers-3-200x200.jpg'
		}, 
		{
			id: '3',
			name: 'Ronaldo preping to take a kick.', selected: false,
			type: 'page', width: '1080px', height: '1920px', ext: 'png',
			url: 'http://3.bp.blogspot.com/-G_Vuo5eX5UA/Ut0uoqiNqyI/AAAAAAAAA7Q/yes-azQstJk/s200-c/Cristiano+Ronaldo+HD+Wallpaper+1080p.jpg'
		}
	]

	$scope.selectItem = function(item){
		item.selected = !item.selected;

		if(item.selected){
			$scope.masterController.selected.items.push(item);
			$scope.masterController.selected.text = ($scope.masterController.selected.items.length > 1)? 'Items Selected' : 'Item Selected'; 
		} else {
			var index = $scope.masterController.selected.items.indexOf(item);
			if(!angular.isUndefined(index)) $scope.masterController.selected.items.splice(index, 1);
			$scope.masterController.selected.text = ($scope.masterController.selected.items.length > 1)? 'Items Selected' : 'Item Selected';
		}
	}

}