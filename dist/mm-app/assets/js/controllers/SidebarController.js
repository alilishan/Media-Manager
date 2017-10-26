

angular
	.module('mediaManager')
	.controller('SidebarController', ['$scope', SidebarController]);


function SidebarController($scope){

	//https://github.com/Templarian/ui.bootstrap.contextMenu

	$scope.menuOptions = [
		['<i class="fa fa-info-circle"></i> Info', function ($itemScope) {
			//console.log($itemScope.folder);

			var _folders = ($itemScope.folder.count_folders > 0)? $itemScope.folder.count_folders+' folder' : null;
				_folders = ($itemScope.folder.count_folders > 1)? _folders+'s ' : _folders;
			
			var _files = ($itemScope.folder.count_files > 0)? $itemScope.folder.count_files+' file' : null;
				_files = ($itemScope.folder.count_files > 1)? _files+'s ' : _files;
			
			var contents = (_folders !== null && _files !== null)? _folders+', '+_files : null;
				contents = (contents === null && _folders !== null)? _folders : contents;
				contents = (contents === null && _files !== null)? _files : contents;

				contents = (contents === null)? 'Empty' : contents;

			var _template = '<div>';
					//_template += '<div class="icon-folder"></div>'
					_template += '<div>';
						_template += '<div class="control-label">Name</div>';
						_template += '<div class="control-text">'+$itemScope.folder.name+'</div>';
					_template += '</div>';
					_template += '<div class="row">';
						_template += '<div class="col-xs-6">';
							_template += '<div class="control-label">Total Size</div>';
							_template += '<div class="control-text">'+$itemScope.folder.size+'</div>';
						_template += '</div>';
						_template += '<div class="col-xs-6">';
							_template += '<div class="control-label">Contains</div>';
							_template += '<div class="control-text">'+contents+'</div>';
						_template += '</div>';
					_template += '</div>';
					_template += '<div>';
						_template += '<div class="control-label">Created</div>';
						_template += '<div class="control-text">'+$itemScope.folder.create_date+'</div>';
					_template += '</div>';
				_template += '</div>';

			swal({
				html: _template,
				confirmButtonClass: 'btn btn-link',
				buttonsStyling: false,
				width: 600,
				customClass: 'info-swal ico-folder',
				showConfirmButton: false,
				showCloseButton: true,
				padding: 0
			}).catch(swal.noop);	

		}],

		null,

		['<i class="fa fa-pencil"></i> Rename', function ($itemScope) {
			//console.log($itemScope.folder);

			swal({
				title: 'Rename Folder',
				input: 'text',
				showCancelButton: true,
				confirmButtonText: 'Rename',
				confirmButtonClass: 'btn btn-success btn-swal',
				cancelButtonClass: 'btn btn-link pull-left btn-swal',
				reverseButtons: true,
				buttonsStyling: false,
				customClass: 'info-swal ico-rename',
				inputValue: $itemScope.folder.name,
				width: 600,
				/*showLoaderOnConfirm: true,
				preConfirm: function (text) {
					return new Promise(function (resolve, reject) {
						setTimeout(function() {
							if (text === '') {
								reject('Need a Value')
							} else {
								resolve()
							}
						}, 500)
					});
				},*/
				allowOutsideClick: false
			}).then(function (text) {
				if(text !== ''){
					$itemScope.folder.name = text;
					$scope.masterController.folders.manager.edit($itemScope.folder.id, text);
				}
			}).catch(swal.noop);
		}],

		['<i class="fa fa-trash-o"></i> Delete', function ($itemScope) {
			//console.log($itemScope.folder);

			var _template = '<div class="dc-content">'
					_template += '<h3>Warning: this cannot be undone.</h3>';
					_template += '<div class="checkedbox checked"> All Sub-Folders linked to the Folder will be <strong>deleted</strong>.</div>';
					_template += '<div class="checkedbox checked"> All Media Files linked to the Folder will be <strong>deleted</strong>.</div>';
					_template += '<div class="checkedbox checked"> All content linked to the Media in the Folders will be <strong>broken</strong>.</div>';
				_template += '</div>';

			swal({
				title: 'Delete '+$itemScope.folder.name,
				html: _template,
				showCancelButton: true,
				cancelButtonClass: 'btn btn-link pull-left btn-swal',
				reverseButtons: true,
				buttonsStyling: false,
				customClass: 'info-swal ico-remove',
				confirmButtonClass: 'btn btn-danger btn-swal',
				confirmButtonText: 'Yes, Delete it!',
				width: 700,
				allowEnterKey: false,
			}).then(function () {
				$scope.masterController.folders.manager.delete($itemScope.folder.id)
			}).catch(swal.noop);

		}],

		// null,
		
		// ['More...', [
		// 	['Alert Cost', function ($itemScope) {
		// 		alert($itemScope);
		// 	}],
		// 	['Alert Player Gold', function ($itemScope) {
		// 		alert($scope);
		// 	}]
		// ]]
	];


}