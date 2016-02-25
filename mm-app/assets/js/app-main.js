
//Initialize Application 
angular
    .module('mediaManager', [
        'ui.router',
        'ngAnimate'
    ]);


//Platform Ready
angular
    .module('mediaManager')
	.run(function($state) {

	    angular.element(document).ready(function () {

	    });

	});

//Constants
angular
    .module('mediaManager')
    .constant('APP_CONST',{
        'restrictionMessage': 'Max file size is 20MB, Max Resolution is 2000px, jpeg, png, mp4, txt, php, html only.',
        'postmessageParent': window.parent.MediaManager.settings.postmessageParent,
        'fileuploadPath': window.parent.MediaManager.settings.fileuploadPath,
        'getMediaListing': window.parent.MediaManager.settings.getMediaListing,
        'postMediaDelete': window.parent.MediaManager.settings.postMediaDelete,
        'postVirtualFile': window.parent.MediaManager.settings.postVirtualFile
    });