

angular
	.module('mediaManager')
	.directive('mmMaincontent', MainContentDirective);


function MainContentDirective($timeout){
	return {
		restrict: 'C',
		link: function(scope, element, attrs){

			function adjustHeight(){

				$(document).ready(function($) {
					$(element).css({
						position: 'absolute',
						height: ($(window).innerHeight() - 110)+'px', //110 is offset heights for header and footerbars
						overflow: 'auto',
					});
				});

				$(window).resize(function(){
					adjustHeight();
				});

			}

			$timeout(function(){
				adjustHeight();
			}, 0);
			
		}
	}
}