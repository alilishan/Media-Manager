
//Initialize Application 
angular
    .module('mediaManager', [
        'ui.router',
        'ngAnimate',
        'ui.tree',
        'naturalSort',
        'angular-growl',
        'base64',
        'ui.bootstrap.contextMenu',
        'angularLazyImg'
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
        'version': '2.3.0',
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



//Lazy Load
angular
    .module('mediaManager')
    .config(['lazyImgConfigProvider', function(lazyImgConfigProvider){
        var scrollable = document.querySelector('#listing-wrap');
        
        lazyImgConfigProvider.setOptions({
            offset: 100,
            errorClass: 'error',
            successClass: 'success',
            //onError: function(image){},
            //onSuccess: function(image){}
            container: angular.element(scrollable)
        });
    }]);


//https://stackoverflow.com/questions/7208624/check-if-element-is-before-or-after-another-element-in-jquery
$.fn.isAfter = function(sel){
  return this.prevAll(sel).length !== 0;
}
$.fn.isBefore= function(sel){
  return this.nextAll(sel).length !== 0;
}