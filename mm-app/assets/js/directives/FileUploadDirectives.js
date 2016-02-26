

angular
	.module('mediaManager')
	.directive('mmOnChange', FileinputChangeDirective)
	.directive('mmDropzone', FileinputDropzoneDirective)
	.directive('mmThumb', ImagePreviewDirective);


function FileinputChangeDirective($timeout){
	return {
		restrict: 'A',
		scope: {
			ngMultiple: '='
		},
		link: function(scope, element, attrs){

			function bindEvent(){
				element.on('change', function(event){
					event.preventDefault();
					var files = (event.target.files !== undefined) ? event.target.files : (event.target.value ? { name: event.target.value.replace(/^.+\\/, '') } : null);	
						//console.log(event, files);
					var onChangeFn = scope.$eval('$parent.'+attrs.ngOnChange); //Need to do this because of targetting issues
						onChangeFn(files);	
				});

				scope.$watch('ngMultiple', function(newVal, oldVal){
					if(newVal){
						element.attr('multiple', '');
					}
				}, true);

				scope.$on('FILEUPLOAD-CLOSED', function(){
					setTimeout(function() {
						element.val('');
					}, 1000);	
				});
			}

			$timeout(function(){
				bindEvent();
			}, 0);
			
		}
	}
}

function FileinputDropzoneDirective(){
	return {
		restrict: 'A',
		scope: {
			ngMultiple: '=',
			ngOnChange: '&',
		},
		link: function(scope, element, attrs){
			console.log('Ignoring single select for now. Its set as:', scope.ngMultiple)
			//console.log(scope.ngOnChange)

			var support = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

			if(!support){
				element.addClass('no-drop-support');
			} else {
 
			$(window)
				.draghover()
				.on({'draghoverstart': function() {
						$('body').addClass('on-drop-hover');
					}, 'draghoverend': function() {
						$('body').removeClass('on-drop-hover');
					}
				});

				$('body')
					.on('dragover', function(ev) { return false; })
					.on('drop', function(ev) {
						$('body').removeClass('on-drop-hover');
						var dt = ev.originalEvent.dataTransfer;
						var files = (dt.files !== undefined) ? dt.files : (e.target.value ? { name: e.target.value.replace(/^.+\\/, '') } : null);
						//console.log(files);
						var onChangeFn = scope.$eval('$parent.'+attrs.ngOnChange); //Need to do this because of targetting issues
							onChangeFn(files);	
						return false;
					});
			}
		}
	}
}

function ImagePreviewDirective($timeout, $window){
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

	return {
		restrict: 'A',
		template: '<canvas/>',
		link: function(scope, element, attrs){

			if(!attrs.hasOwnProperty('ngModel')) return;
			
			var file = scope.$eval(attrs.ngModel);

			if (!helper.isFile(file)) return;
			if (!helper.isImage(file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = element.innerWidth();
                var height = element.innerHeight();
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
		}
	}
}

// The plugin code
$.fn.draghover = function(options) {
  return this.each(function() {

    var collection = $(),
        self = $(this);

    self.on('dragenter', function(e) {
      if (collection.length === 0) {
        self.trigger('draghoverstart');
      }
      collection = collection.add(e.target);
    });

    self.on('dragleave drop', function(e) {
      collection = collection.not(e.target);
      if (collection.length === 0) {
        self.trigger('draghoverend');
      }
    });
  });
};
