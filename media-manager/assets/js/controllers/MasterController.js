

angular
	.module('mediaManager')
	.controller('MasterController', MasterController);


function MasterController($scope, APP_CONST){
	var _this = this;
		_this.APP_CONST = APP_CONST;
	
}

MasterController.prototype.closeMessage = function(){
	var $this = this;
	var obj = {
		action: 'close'
	}
	parent.postMessage(JSON.stringify(obj), $this.APP_CONST.postmessageParent);
}

MasterController.prototype.modifyTheme = function(data){
	less.modifyVars({
		'@themeColor': data.color
	});
}