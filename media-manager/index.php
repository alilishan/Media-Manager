<?php /*$data = file_get_contents("data.json");*/ ?>
<!DOCTYPE html>
<html lang="en" ng-app="mediaManager">
<head>
	<meta charset="UTF-8">
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Event Ignite</title>
	<script>
		//var kioskData = <?php /*echo $data;*/ ?>;	
	</script>
	
	<link rel="stylesheet" href="assets/libs/bootstrap-3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/libs/flexboxgrid-6.3.0/flexboxgrid.min.css">
	<link rel="stylesheet" href="assets/libs/font-awesome-4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/css/app-main.css">

	<script src="assets/libs/jquery-1.12.0.min.js"></script>
	<script src="assets/libs/bootstrap-3.3.6/js/bootstrap.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-ui-router.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-animate.min.js"></script>

	<!-- Less
	<link rel="stylesheet/less" type="text/css" data-global-vars='{"themeColor": "#26ac25"}' href="assets/css/app-theme.less" />
	<script data-env="development" src="assets/libs/less/less.min.js"></script>
	 -->

	<script src="assets/js/app-main.js"></script>
	<script src="assets/js/app-router.js"></script>
	<!--<script src="assets/js/factories/DataFactory.js"></script>-->
	<script src="assets/js/controllers/MasterController.js"></script>
	<script src="assets/js/controllers/ListingController.js"></script>
	<script src="assets/js/directives/MainContentDirective.js"></script>
	

</head>
<body ng-controller="MasterController as masterController" ><!--  onmousedown="return false;" -->
	
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
				<ul class="nav navbar-nav" ng-show="masterController.selected.items.length">
					<li><a href=""><i class="fa fa-trash-o "></i></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a href=""><i class="fa fa-sort-alpha-asc"></i></a></li>
				</ul>
				<form class="navbar-form navbar-right">
					<div class="fancy-filter">
						<input type="text" class="form-control" placeholder="">
						<i class="ff-icon fa fa-search"></i>
					</div>
				</form>
			</div>
		</div>


		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-3 col-md-2 sidebar">
					<ul class="nav nav-sidebar">
						<li class="active"><a href="#">All</a></li>
						<li><a href="#"><i class="sb-icon glyphicon glyphicon-picture"></i> Images</a></li>
						<li><a href="#"><i class="sb-icon glyphicon glyphicon-facetime-video"></i> Videos</a></li>
						<li><a href="#"><i class="sb-icon glyphicon glyphicon-file"></i> Pages</a></li>
					</ul>
				</div>

				<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main mm-maincontent">
					<div ui-view></div>
				</div>
			</div>
		</div>


		<footer class="footer">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-3 text-left"><a href="" ng-click="masterController.closeMessage(masterController.open_id)" class="btn btn-link">Cancel</a></div>
					<div class="col-xs-6 text-center">
						<div class="select-count btn" ng-show="masterController.selected.items.length"><span class="label label-success">{{masterController.selected.items.length}}</span>{{masterController.selected.text}}</div>
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