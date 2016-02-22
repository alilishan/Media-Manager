

angular
	.module('mediaManager')
	.directive('mmOnChange', FileinputChangeDirective);


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
					var onChnageFn = scope.$eval('$parent.'+attrs.ngOnChange);
						onChnageFn(files);
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