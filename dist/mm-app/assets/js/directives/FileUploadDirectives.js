

angular
	.module('mediaManager')
	.directive('mmOnChange', ['$timeout', FileinputChangeDirective])
	.directive('mmDropzone', FileinputDropzoneDirective)
	.directive('mmThumb', ['$timeout', '$window', ImagePreviewDirective]);


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
						if(dt){
							//console.log(dt.files);
							var files = (dt.files !== undefined) ? dt.files : (e.target.value ? { name: e.target.value.replace(/^.+\\/, '') } : null);
							var onChangeFn = scope.$eval('$parent.'+attrs.ngOnChange); //Need to do this because of targetting issues
								onChangeFn(files);	
						}
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
		//template: '<canvas/>',
		link: function(scope, element, attrs){

			if(!attrs.hasOwnProperty('ngModel')) return;
			
			var file = scope.$eval(attrs.ngModel);
			var type = file.type.split('/')[0];

			if(type == 'video'){
				setasBG("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4IDU4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OCA1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxyZWN0IHg9IjEiIHk9IjciIHN0eWxlPSJmaWxsOiM3MzgzQkY7c3Ryb2tlOiM0MjRBNjA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB3aWR0aD0iNTYiIGhlaWdodD0iNDQiLz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHBvaW50cz0iMjUsMzYgMjUsMjguOTU0IDI1LDIyIDM2LDI5ICIvPgo8cmVjdCB4PSIxIiB5PSI3IiBzdHlsZT0iZmlsbDojNTU2MDgwO3N0cm9rZTojNDI0QTYwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjExIi8+CjxyZWN0IHg9IjEiIHk9IjE4IiBzdHlsZT0iZmlsbDojNTU2MDgwO3N0cm9rZTojNDI0QTYwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjExIi8+CjxyZWN0IHg9IjEiIHk9IjI5IiBzdHlsZT0iZmlsbDojNTU2MDgwO3N0cm9rZTojNDI0QTYwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjExIi8+CjxyZWN0IHg9IjEiIHk9IjQwIiBzdHlsZT0iZmlsbDojNTU2MDgwO3N0cm9rZTojNDI0QTYwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjExIi8+CjxyZWN0IHg9IjQ3IiB5PSI3IiBzdHlsZT0iZmlsbDojNTU2MDgwO3N0cm9rZTojNDI0QTYwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjExIi8+CjxyZWN0IHg9IjQ3IiB5PSIxOCIgc3R5bGU9ImZpbGw6IzU1NjA4MDtzdHJva2U6IzQyNEE2MDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMSIvPgo8cmVjdCB4PSI0NyIgeT0iMjkiIHN0eWxlPSJmaWxsOiM1NTYwODA7c3Ryb2tlOiM0MjRBNjA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB3aWR0aD0iMTAiIGhlaWdodD0iMTEiLz4KPHJlY3QgeD0iNDciIHk9IjQwIiBzdHlsZT0iZmlsbDojNTU2MDgwO3N0cm9rZTojNDI0QTYwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgd2lkdGg9IjEwIiBoZWlnaHQ9IjExIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=", '#efefef');
				return false;
			}

			if(type == 'audio'){
				setasBG("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU0Ljg4OCA1NC44ODgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU0Ljg4OCA1NC44ODg7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojRUE2MjQ4OyIgZD0iTTUyLjEwNCwwLjI0OWMtMC4yMTYtMC4xODktMC41MDEtMC4yNzUtMC43ODktMC4yNDFsLTMxLDQuMDExYy0wLjQ5OSwwLjA2NS0wLjg3MiwwLjQ4OS0wLjg3MiwwLjk5MiAgdjYuMDE3djQuMjEydjI2LjAzNUMxNy43MDYsMzkuMjg1LDE0Ljk5NywzOCwxMS45NDQsMzhjLTUuMjQ3LDAtOS41LDMuNzgxLTkuNSw4LjQ0NHM0LjI1Myw4LjQ0NCw5LjUsOC40NDRzOS41LTMuNzgxLDkuNS04LjQ0NCAgYzAtMC4zMzItMC4wMjctMC42NTgtMC4wNjktMC45ODFjMC4wNC0wLjEwOCwwLjA2OS0wLjIyMSwwLjA2OS0wLjM0M1YxNi4xMThsMjktMy43NTN2MTguOTA5QzQ4LjcwNiwyOS4yODUsNDUuOTk3LDI4LDQyLjk0NCwyOCAgYy01LjI0NywwLTkuNSwzLjc4MS05LjUsOC40NDRzNC4yNTMsOC40NDQsOS41LDguNDQ0czkuNS0zLjc4MSw5LjUtOC40NDRjMC0wLjA5Mi0wLjAxMi0wLjE4MS0wLjAxNS0wLjI3MiAgYzAuMDAyLTAuMDI3LDAuMDE1LTAuMDUsMC4wMTUtMC4wNzdWMTEuMjI3VjcuMDE2VjFDNTIuNDQ0LDAuNzEyLDUyLjMyLDAuNDM4LDUyLjEwNCwwLjI0OXoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==", '#efefef');
				return false;
			}		

            //var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(file);

            function onLoadFile(event) {
                var img = new Image();
                //img.onload = onLoadImage;
                img.onload = function(){
                	setasBG(this.src);
                } 
                img.src = event.target.result;
            }

            function setasBG(img, color){
            	$(element).css({
            		'background-image': 'url('+img+')',
            		'background-size': 'cover',
            		'background-color': 'transparent', //(typeof color == 'undefined')? '#333': color,
            		'background-repeat': 'no-repeat',
            		'background-position': 'center center',
            	});
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
