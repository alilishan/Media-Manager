<!DOCTYPE html>
<html lang="en" ng-app="mediaManager">
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Media Manager</title>
	
	<link rel="stylesheet" href="assets/libs/bootstrap-3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/libs/flexboxgrid-6.3.0/flexboxgrid.min.css">
	<link rel="stylesheet" href="assets/libs/font-awesome-4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/libs/text-spinners-1.0.4/spinners.css">
	<link rel="stylesheet" href="assets/css/app-main.css">

	<script src="assets/libs/jquery-1.12.0.min.js"></script>
	<script src="assets/libs/bootstrap-3.3.6/js/bootstrap.min.js"></script>
	<script src="assets/libs/jquery-ui-1.11.4.custom.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-ui-router.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-animate.min.js"></script>
	<script src="assets/libs/underscore-min.js"></script>
	<script src="assets/libs/ng-ui-sortable/sortable.js"></script>
	<script src="assets/libs/ng-ui-sortable/tg.dynamic.directive.js"></script>

	<script src="assets/js/app-main.js"></script>
	<script src="assets/js/app-router.js"></script>
	<script src="assets/js/factories/DataFactory.js"></script>
	<script src="assets/js/factories/FileUploadFactory.js"></script>
	<script src="assets/js/controllers/MasterController.js"></script>
	<script src="assets/js/controllers/ListingController.js"></script>
	<script src="assets/js/directives/MainContentDirective.js"></script>
	<script src="assets/js/directives/FileUploadDirectives.js"></script>
	

</head>
<body ng-controller="MasterController as masterController" >
	
	<div class="mm-wrapper">
		
		<div class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header"><span class="navbar-brand">Media Manager v{{masterController.version}}</span></div>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="" ng-click="masterController.showInfo()" class="btn-close"><i class="glyphicon glyphicon-info-sign"></i></a></li>
					<li><a href="" ng-click="masterController.closeMessage(masterController.OPEN_ID)" class="btn-close"><i class="glyphicon glyphicon-remove"></i></a></li>
				</ul>
			</div>
			<div class="container-fluid">
				<ul class="nav navbar-nav navbar-right nav-pushed-left">
					<li><a href="" ng-click="masterController.folders.manager.enabled = !masterController.folders.manager.enabled"><i class="fa fa-folder-o"></i> FOLDERS</a></li>
					<li><a href="" ng-click="masterController.filter.show = !masterController.filter.show"><i class="fa fa-sliders"></i> FILTERS</a></li>
				</ul>
				<form class="navbar-form navbar-right">
					<div class="fancy-filter" ng-class="{'is-wide':masterController.filter.search.string}">
						<input type="text" class="form-control" ng-model="masterController.filter.search.string" placeholder="SEARCH">
						<i class="ff-icon fa fa-search"></i>
					</div>
				</form>
			</div>
		</div>

		<a href="" ng-click="masterController.addItems.enabled = !masterController.addItems.enabled" ng-class="{'btnf-close': masterController.addItems.enabled}" class="btn-add"><span class="btnf-icon"></span></a>

		<div class="container-fluid">
			<div class="row">
				
				<div ui-view></div>
				
			</div>
		</div>


		<footer class="footer">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-2 text-left"><a href="" ng-click="masterController.closeMessage(masterController.OPEN_ID)" class="btn btn-link">Close</a></div>
					<div class="col-xs-8 text-center">
						<div class="select-count btn" ng-show="masterController.selected.items.length"><span class="label label-success">{{masterController.selected.items.length}}</span>{{masterController.selected.text}}</div>
						<a href="" class="btn btn-link"  ng-show="masterController.selected.items.length" ng-click="masterController.deleteSelection(masterController.OPEN_ID, masterController.selected.items)"><span class="text-danger"><i class="fa fa-trash-o "></i> Delete</span></a>
					</div>
					<div class="col-xs-2">
						<a href="" ng-show="masterController.selected.items.length && masterController.OPEN_MODE != 'MANAGE'" ng-click="masterController.makeSelection(masterController.OPEN_ID, masterController.selected.items)" class="btn btn-success">Select</a>
					</div>
				</div>
				
			</div>
		</footer>

		<div id="mm-toast-cover" class="row center-xs middle-xs">
			<div class="col-xs-4"><div class="mm-toast-msg" ng-class="{'is-open': masterController.toast.message !== '' }">{{masterController.toast.message}}</div></div>
		</div>

	</div>


	<form id="mm-media-upload" action="#" method="POST"><input type="file" id="mm-media-upload-input" mm-on-change ng-multiple="masterController.fileupload.multiple" ng-on-change="masterController.fileupload.addFiles" name="file[]" ></form>

</body>
</html>