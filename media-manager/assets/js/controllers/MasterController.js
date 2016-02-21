

angular
	.module('mediaManager')
	.controller('MasterController', MasterController);


function MasterController($scope, APP_CONST){
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