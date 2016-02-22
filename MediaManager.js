//Requires - 
	// jQuery
	// Fancybox
	// $q

var MediaManager = {
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
			postmessageParent: 'http://localhost/',
			fileuploadPath: 'http://localhost/mediaManager/ajax_image_upload.php'
		}, options);

		this.initialized = false;
		this.callbacks = {};

		var $this = this;

		window.addEventListener("message", function(event){
			var args = arguments;
				args[0].data = event;
			var data = JSON.parse(args[0].data);
			
			if(data.action == 'close'){
				$this.Close();
				if($this.callbacks.hasOwnProperty(data.id)) delete $this.callbacks[data.id];
				
			} else {
				if($this.callbacks.hasOwnProperty(data.id)){
					$this.callbacks[data.id].resolve(data);

					delete $this.callbacks[data.id];

					$this.Close();
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
			id: Math.floor(50*Math.random())+""+(new Date).getTime(),
			selectMode: 'single',
			filterType: 'all'
		}, options);
	var response = Q.defer();

	$this.callbacks[data.id] = response;
	$this.fancybox.href = $this.settings.path+'#/app/listing?'+$.param(data);

	$.fancybox.open($this.fancybox);

	//console.log(data, $this.callbacks, $this.fancybox);
	return response.promise;
}

MediaManager.Close = function(){
	var response = Q.defer();
	$.fancybox.close();
	response.resolve();
	return response.promise;
}