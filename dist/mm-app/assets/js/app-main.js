
//Initialize Application 
angular
    .module('mediaManager', [
        'ui.router',
        'ngAnimate',
        'ui.tree',
        'naturalSort',
        'angular-growl',
        'base64',
        'ui.bootstrap.contextMenu'
    ]);


//Platform Ready
angular
    .module('mediaManager')
	.run(['$state', function($state) {
    
        angular.element(document).ready(function () {

        });

    }]);

//Constants
angular
    .module('mediaManager')
    .constant('APP_CONST',{
        'version': '2.2.1',
        'restrictionMessage': 'Max file size is 20MB, Max Resolution is 4000px, jpeg, png, mp4, txt, php, html only.',
        'postmessageParent': window.parent.MediaManager.settings.postmessageParent,
        'fileuploadPath': window.parent.MediaManager.settings.fileuploadPath,
        'getMediaListing': window.parent.MediaManager.settings.getMediaListing,
        'getTranscodingProgress': window.parent.MediaManager.settings.getTranscodingProgress,
        'postMediaUpdates': window.parent.MediaManager.settings.postMediaUpdates,
        'postMediaDelete': window.parent.MediaManager.settings.postMediaDelete,
        'postVirtualFile': window.parent.MediaManager.settings.postVirtualFile,
        'postFolderSave': window.parent.MediaManager.settings.postFolderSave,
        'postPixieImageCreate': window.parent.MediaManager.settings.postPixieImageCreate,
        'transcoding': window.parent.MediaManager.settings.transcoding,
        'firstLevelFilters': {
            image: window.parent.MediaManager.settings.flf_image,
            video: window.parent.MediaManager.settings.flf_video,
            audio: window.parent.MediaManager.settings.flf_audio,
            page: window.parent.MediaManager.settings.flf_page
        },
        'maxUploadFileSize': window.parent.MediaManager.settings.maxUploadFileSize
    });


//Custom filters
angular
    .module('mediaManager')
    .filter('uriescape', function() {
        return window.encodeURIComponent;
    });   

//http://stackoverflow.com/questions/18095727/limit-the-length-of-a-string-with-angularjs
angular
    .module('mediaManager')
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });


//Growl
angular
    .module('mediaManager')
    .config(['growlProvider', function (growlProvider) {
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalDisableIcons(true);
        growlProvider.globalPosition('top-center');
    }]);