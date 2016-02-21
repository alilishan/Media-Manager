<!DOCTYPE html>
<html lang="en" ng-app="mediaManager">
<head>
	<meta charset="UTF-8">">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Media Manager</title>
	
	<link rel="stylesheet" href="assets/libs/bootstrap-3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/libs/flexboxgrid-6.3.0/flexboxgrid.min.css">
	<link rel="stylesheet" href="assets/libs/font-awesome-4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/css/app-main.css">

	<script src="assets/libs/jquery-1.12.0.min.js"></script>
	<script src="assets/libs/bootstrap-3.3.6/js/bootstrap.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-ui-router.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-animate.min.js"></script>

	<script src="assets/js/app-main.js"></script>
	<script src="assets/js/app-router.js"></script>
	<!--<script src="assets/js/factories/DataFactory.js"></script>-->
	<script src="assets/js/controllers/MasterController.js"></script>
	<script src="assets/js/controllers/ListingController.js"></script>
	<script src="assets/js/directives/MainContentDirective.js"></script>
	

</head>
<body ng-controller="MasterController as masterController" >
	
	<div class="mm-wrapper">
		
		<div class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header"><span class="navbar-brand">Media Manager</span></div>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="" class="btn-close"><i class="glyphicon glyphicon-info-sign"></i></a></li>
					<li><a href="" ng-click="masterController.closeMessage(masterController.open_id)" class="btn-close"><i class="glyphicon glyphicon-remove"></i></a></li>
				</ul>
			</div>
			<div class="container-fluid">
				<ul class="nav navbar-nav navbar-right nav-pushed-left">
					<li><a href="" ng-click="masterController.filter.show = !masterController.filter.show"><i class="fa fa-sliders"></i> FILTERS</a></li>
				</ul>
				<form class="navbar-form navbar-right">
					<div class="fancy-filter">
						<input type="text" class="form-control" placeholder="">
						<i class="ff-icon fa fa-search"></i>
					</div>
				</form>
				<a class="btn-add"><span class="btnf-icon"></span></a>
			</div>
		</div>


		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-2 sidebar">
					<ul class="nav nav-sidebar">
						<li ng-class="{'active': masterController.filter.type == 'all'}"><a href="">All</a></li>
						<li ng-class="{'active': masterController.filter.type == 'images'}"><a href=""><i class="sb-icon fa fa-image"></i> Images</a></li>
						<li ng-class="{'active': masterController.filter.type == 'videos'}"><a href=""><i class="sb-icon fa fa-film"></i> Videos</a></li>
						<li ng-class="{'active': masterController.filter.type == 'pages'}"><a href=""><i class="sb-icon fa fa-file-code-o"></i> Pages</a></li>
					</ul>
				</div>

				<div class=" col-xs-offset-2 col-xs-10 main mm-maincontent" ng-class="{ 'col-xs-8': masterController.filter.show }">
					<div ui-view></div>
				</div>

				<div class="col-xs-2 filters" ng-class="{'is-open':  masterController.filter.show }">
					
				</div>
			</div>
		</div>


		<footer class="footer">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-3 text-left"><a href="" ng-click="masterController.closeMessage(masterController.open_id)" class="btn btn-link">Cancel</a></div>
					<div class="col-xs-6 text-center">
						<div class="select-count btn" ng-show="masterController.selected.items.length"><span class="label label-success">{{masterController.selected.items.length}}</span>{{masterController.selected.text}}</div>
						<a href="" class="btn btn-default"  ng-show="masterController.selected.items.length"><i class="fa fa-trash-o "></i></a>
					</div>
					<div class="col-xs-3">
						<a href="" ng-show="masterController.selected.items.length" ng-click="masterController.makeSelection(masterController.open_id, masterController.selected.items)" class="btn btn-success">Select</a>
					</div>
				</div>
				
			</div>
		</footer>

	</div>

	<!-- Main View is in side app-main.html -->
	 

</body>
</html>