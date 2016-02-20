//Requires - 
	// jQuery
	// Fancybox
	// $q

var MediaManager = {
	postmessageParent: 'http://localhost/',
	fancybox: { 
		title : null,
		type: 'iframe',
		padding: 0,
		openEffect : 'none',
		closeEffect  : 'none',
		wrapCSS: '',
		width: '90%',
		height: '90%', 
		openSpeed: 100,
		openSpeed: 100,
		autoSize: false,
		modal: true,
		afterShow: function(){},
		afterClose: function(){}
	},
	Initialize: function(options){
		this.settings = $.extend({
			path: '',
		}, options);

		this.initialized = false;
		this.callbacks = {};

		var $this = this;

		window.addEventListener("message", function(event){
			var args = arguments;
				args[0].data = event;
			var data = JSON.parse(args[0].data);
			
			if(data.action == 'close'){
				$.fancybox.close();
			} else {
				if($this.callbacks.hasOwnProperty(data.id)){
					$this.callbacks[data.id].resolve(data);

					delete $this.callbacks[data.id];
				}
			}	
		}, false);



		this.initialized = true;

		return this;
	}
}	

MediaManager.Open = function(options){
	var $this = this;
	var data = $.extend({
			id: Math.floor(50*Math.random())+""+(new Date).getTime()
		}, options);
	var response = Q.defer();

	$this.callbacks[data.id] = response;
	$this.fancybox.href = $this.settings.path+'#/app/images?id='+data.id;

	$.fancybox.open($this.fancybox);

	//console.log(data, $this.callbacks, $this.fancybox);
	return response.promise;
}