

angular
	.module('mediaManager')
	.controller('ImagesController', ImagesController);


function ImagesController($scope, APP_CONST, $stateParams){
	$scope.masterController.pageClass = 'page-images';

	$scope.params = $stateParams;
	$scope.consts = APP_CONST;

	$scope.sendMessage = function(){
		var obj = {
			id: $stateParams.id,
			url: '',
			action: 'select'
		}
		parent.postMessage(JSON.stringify(obj), APP_CONST.postmessageParent);
	}

}