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
	<link rel="stylesheet" href="assets/css/app-main.css">
	<link rel="stylesheet" href="assets/libs/animate.css">

	<script src="assets/libs/jquery-1.12.0.min.js"></script>
	<script src="assets/libs/bootstrap-3.3.6/js/bootstrap.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-ui-router.min.js"></script>
	<script src="assets/libs/angular-1.5.0/angular-animate.min.js"></script>
	<script src="assets/plugin/ng-moment/moment.js"></script>
	<script src="assets/plugin/ng-moment/angular-moment.min.js"></script>
	<script src="assets/libs/underscore-min.js"></script>

	<!-- Less
	<link rel="stylesheet/less" type="text/css" data-global-vars='{"themeColor": "#26ac25"}' href="assets/css/app-theme.less" />
	<script data-env="development" src="assets/libs/less/less.min.js"></script>
	 -->

	<script src="assets/js/app-main.js"></script>
	<script src="assets/js/app-router.js"></script>
	<!--<script src="assets/js/factories/DataFactory.js"></script>-->
	<script src="assets/js/controllers/MasterController.js"></script>
	<script src="assets/js/controllers/ImagesController.js"></script>
	<script src="assets/js/directives/MainContentDirective.js"></script>
	

</head>
<body ng-controller="MasterController as masterController" ><!--  onmousedown="return false;" -->
	
	<div class="mm-wrapper">
		
		<div class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">
				<button type="button" class="close" ng-click="masterController.closeMessage()" aria-label="Close">&times;</button>
				<div class="navbar-header"><span class="navbar-brand">Media Manager</span></div>
			</div>
		</div>

		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-3 col-md-2 sidebar"></div>

				<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main mm-maincontent">
					<div ui-view></div>
				</div>
			</div>
		</div>

		<footer class="footer">
			<div class="container">
				<p class="text-muted">Place sticky footer content here.</p>
			</div>
		</footer>

	</div>

	<!-- Main View is in side app-main.html -->
	 

</body>
</html>