

angular
	.module('mediaManager')
	.directive('mmOnChange', FileinputChangeDirective)
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
						console.log(event, files);
					var onChangeFn = scope.$eval('$parent.'+attrs.ngOnChange);
						onChangeFn(files);	
				});

				scope.$watch('ngMultiple', function(newVal, oldVal){
					if(newVal){
						element.attr('multiple', '');
					}
				}, true);
			}

			$timeout(function(){
				bindEvent();
			}, 0);
			
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

