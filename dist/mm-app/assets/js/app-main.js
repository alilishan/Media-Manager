
//Initialize Application 
angular
    .module('mediaManager', [
        'ui.router',
        'ngAnimate',
        'ui.sortable',
        'tg.dynamicDirective',
        'naturalSort'
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
        'version': '2.1.0',
        'restrictionMessage': 'Max file size is 20MB, Max Resolution is 4000px, jpeg, png, mp4, txt, php, html only.',
        'postmessageParent': window.parent.MediaManager.settings.postmessageParent,
        'fileuploadPath': window.parent.MediaManager.settings.fileuploadPath,
        'getMediaListing': window.parent.MediaManager.settings.getMediaListing,
        'postMediaUpdates': window.parent.MediaManager.settings.postMediaUpdates,
        'postMediaDelete': window.parent.MediaManager.settings.postMediaDelete,
        'postVirtualFile': window.parent.MediaManager.settings.postVirtualFile,
        'postFolderSave': window.parent.MediaManager.settings.postFolderSave,
        'postPixieImageCreate': window.parent.MediaManager.settings.postPixieImageCreate,
        'firstLevelFilters': {
            image: window.parent.MediaManager.settings.flf_image,
            video: window.parent.MediaManager.settings.flf_video,
            audio: window.parent.MediaManager.settings.flf_audio,
            page: window.parent.MediaManager.settings.flf_page
        }
    });


//Custom filters
angular
    .module('mediaManager')
    .filter('uriescape', function() {
        return window.encodeURIComponent;
    });    