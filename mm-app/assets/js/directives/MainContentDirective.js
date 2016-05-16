

angular
	.module('mediaManager')
	.directive('mmMaincontent', MainContentDirective)
	.directive('mmItemDraggable', ListItemDraggable)
	.directive('mmSidebarDroppable', SidebarDroppable);


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


function ListItemDraggable($timeout){
	return {
		restrict: 'A',
		scope: {
			mmItemDraggable: '=',
			mmIdrgModel: '='
		},
		link: function(scope, element, attrs){

			function bindUI(){

				$(document).ready(function($) { 

					
					$(element).draggable({
						delay: 100,
						start: function(){
							if(!scope.mmItemDraggable) return false;
						},
						appendTo: "body",
						cursorAt: {left: -10, top: -10},
						helper: function(event) {

							var numOfSelectedItems = scope.mmIdrgModel.items, //$('.media-item.item-selected').length,
								uiMainHelperElement = $('<div class="mm-item-drag-helper"></div>');

							var itemFinalWidth = 25,
								itemFinalHeight = 25,
								numOfItemsInRow = 3,
								spaceBetween = 2;

							for (var i = 0; i < numOfSelectedItems.length; i++) {

								//var image = $('.media-item[data-id="'+numOfSelectedItems[i].id+'"]').find('.image img').attr('src');
								//var copy = $('<div><img src="'+image+'" /></div>')

								var type = numOfSelectedItems[i].type;

								var iconType = 'fa';

								switch(type) {
									case 'image':
										iconType = iconType + ' fa-image';
										break;
									case 'video':
										iconType = iconType + ' fa-film';
										break;
									default:
										iconType = iconType + ' fa-file-code-o';
										break;
								}

								var copy = $('<div><i class="'+iconType+'"></i></div>')
									.addClass('item-icon')
									.css({
										width: 50, height: 50,
										padding: '3px 0 0 3px', margin: 0, position: 'absolute', overflow: 'hidden', 'z-index': '-'+i
									})
									.appendTo(uiMainHelperElement)
									.animate({ 
										width: itemFinalWidth, height: itemFinalHeight, 
										left: ((itemFinalWidth + spaceBetween) * (i % numOfItemsInRow)), 
										top: (parseInt(i / numOfItemsInRow) * (itemFinalHeight + spaceBetween))
									}, 320);	
							}

							//$('<span class="label label-primary">'+numOfSelectedItems+'</span>').appendTo(uiMainHelperElement);

							return uiMainHelperElement;
						}
					});

				});

			}

			$timeout(function(){
				bindUI();
			}, 0);
			
		}
	}
}


function SidebarDroppable($rootScope, $timeout){
	return {
		restrict: 'cursorAt',
		scope: {
			mmSidebarDroppable: '&'
		},
		link: function(scope, element, attrs){

			function bindUI(){

				$(document).ready(function($) {
					$(element).droppable({
						accept: '.media-item',
						hoverClass: 'drop-hover',
						tolerance: "pointer",
						drop: function( event, ui ){
							scope.mmSidebarDroppable();
						}
					});
				});

			}

			$timeout(function(){
				bindUI();
			}, 0);
			
		}
	}
}