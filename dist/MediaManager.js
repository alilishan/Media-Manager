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
		wrapCSS: 'mm-custom-wrapper',
		width: '98%',
		height: '98%', 
		openSpeed: 1000,
		autoSize: false,
		scrolling: 'no',
		scrollOutside: false,
		modal: true,
		helpers: { 
			media : {}, 
			overlay : {
				closeClick : false,
				css : { 'background' : 'rgba(0, 0, 0, .8)', 'overflow': 'hidden'}
			}
		},
		afterShow: function(){},
		afterClose: function(){}
	},
	Initialize: function(options){
		this.settings = $.extend({
			path: 'mm-app/',
			postmessageParent: '*',
			fileuploadPath: 'http://localhost/MediaManager/demo_files/PHP_UPLOAD_XFILE.php',
			getMediaListing: 'http://localhost/MediaManager/demo_files/mm-data.json', 
			postMediaUpdates: 'http://localhost/MediaManager/demo_files/ajax_media_edit.php', 
			postMediaDelete: 'http://localhost/MediaManager/demo_files/ajax_image_upload.php',
			postVirtualFile: 'http://localhost/MediaManager/demo_files/ajax_image_upload.php',
			postFolderSave: 'http://localhost/MediaManager/demo_files/ajax_folder.php?type=save',
			postPixieImageCreate: 'http://localhost/MediaManager/demo_files/save-image.php',
			getTranscodingProgress: 'http://localhost/MediaManager/demo_files/transcoding.php',
			flf_image: true, //First Level Filters
			flf_video: true,
			flf_audio: true,
			flf_page: true,
			transcoding: true,
			maxUploadFileSize: 2000
		}, options);

		this.initialized = false;
		this.callbacks = {};

		var $this = this;

		window.addEventListener("message", function(event){
			var args = arguments;
				args[0].data = event;

			try {
				var data = JSON.parse(args[0].data);
			} catch(e) {
				//console.log('ALERT MM ERR', e, args);
				return false;
			}	
			
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
			filterType: '',
			selectFolder: '0'
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