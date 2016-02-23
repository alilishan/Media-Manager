

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
						height: ($(window).innerHeight() - 160)+'px', //(100 + 60) is offset heights for header and footerbars
						overflow: 'auto',
						left: '0',
						top: '101px' //Headerbar is 100px
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