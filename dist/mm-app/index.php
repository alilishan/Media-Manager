<!DOCTYPE html>
<html lang="en" ng-app="mediaManager">
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Media Manager</title>
	
	<link rel="stylesheet" href="assets/libs/bootstrap-3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/libs/font-awesome-4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/css/app-main-plugins.min.css">
	<link rel="stylesheet" href="assets/css/app-main.css">

	<script src="assets/js/app-main-jquery.min.js"></script>
	<script src="assets/js/app-main-angular.min.js"></script>
	<script src="assets/js/app-main-plugins.min.js"></script>
	<script src="assets/libs/angular-lazy-img.min.js"></script>

	<script src="assets/js/app-main.min.js"></script>
	<script src="assets/js/app-factories.min.js"></script>
	<script src="assets/js/app-controllers.min.js"></script>
	<script src="assets/js/app-directives.min.js"></script>
	

</head>
<body ng-controller="MasterController as masterController" >
	
	<div class="mm-wrapper">
		
		<div class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header"><span class="navbar-brand">Media Manager {{masterController.version}}</span></div>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="" ng-click="masterController.showInfo()" class="btn-close"><i class="glyphicon glyphicon-info-sign"></i></a></li>
					<li><a href="" ng-click="masterController.closeMessage(masterController.OPEN_ID)" class="btn-close"><i class="glyphicon glyphicon-remove"></i></a></li>
				</ul>
			</div>
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-8 col-xs-offset-2">

						<div class="bulk-action pull-left" ng-class="{'isVisible': masterController.selected.items.length }"><!-- ng-show="masterController.selected.items.length" -->
							<div class="select-count btn btn-defailt" >{{masterController.selected.items.length}}</div><!-- masterController.selected.text -->
							<a href="" class="btn btn-link" ng-click="masterController.deleteSelection($event, masterController.OPEN_ID, masterController.selected.items)"><span class="text-danger"><i class="fa fa-trash-o "></i>Delete</span></a>
							<a href="" class="btn btn-link" ng-click="masterController.clearSelected($event)">Clear Selection</a>
						</div>

						<div class="fancy-filter pull-left">
							<i class="icon"></i>
							<input id="jetsSearch" type="text" class="ff-input" placeholder="Search" ng-model="masterController.filter.search.string">
						</div>

						<div class="pull-right">
							<div class="layout-toggle btn-group">
								<a href="" ng-class="{'isON': masterController.listing.layout == 'grid'}" ng-click="masterController.listing.layout = 'grid'" class="btn btn-link"><i class="fa fa-th-large"></i></a>
								<a href="" ng-class="{'isON': masterController.listing.layout == 'grid-sm'}" ng-click="masterController.listing.layout = 'grid-sm'" class="btn btn-link"><i class="fa fa-th"></i></a>
								<a href="" ng-class="{'isON': masterController.listing.layout == 'list'}" ng-click="masterController.listing.layout = 'list'" class="btn btn-link"><i class="fa fa-bars"></i></a>
								<a href="" ng-class="{'isON': masterController.filter.show}" ng-click="masterController.filter.show = !masterController.filter.show" class="btn btn-link"><i class="fa fa-sliders"></i></a>
							</div>
						</div>

					</div>
				</div>
				<?php /* ?>
				<form class="navbar-form navbar-right">
					<div class="fancy-filter" ng-class="{'is-wide':masterController.filter.search.string}">
						<input type="text" class="form-control" ng-model="masterController.filter.search.string" placeholder="SEARCH">
						<i class="ff-icon fa fa-search"></i>
					</div>
				</form>
				<ul class="nav navbar-nav navbar-right nav-pushed-left">
					<li><a href="" ng-click="masterController.filter.show = !masterController.filter.show"><i class="fa fa-sliders"></i> FILTERS</a></li>
				<?php */ ?>
				</ul>
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
					<div class="col-xs-8 text-center"></div>
					<div class="col-xs-2">
						<a href="" ng-show="masterController.selected.items.length && masterController.OPEN_MODE != 'MANAGE'" ng-click="masterController.makeSelection(masterController.OPEN_ID, masterController.selected.items)" class="btn btn-success">Select</a>
					</div>
				</div>
				
			</div>
		</footer>

		<!-- <div id="mm-toast-cover" class="row center-xs middle-xs">
			<div class="col-xs-4"><div class="mm-toast-msg" ng-class="{'is-open': masterController.toast.message !== '' }">{{masterController.toast.message}}</div></div>
		</div> -->

	</div>


	<form id="mm-media-upload" action="#" method="POST">
		<input type="file" id="mm-media-upload-input" mm-on-change ng-multiple="masterController.fileupload.multiple" ng-on-change="masterController.fileupload.addFiles" name="file[]">
	</form>
	
	<div growl></div>
	
</body>
</html>