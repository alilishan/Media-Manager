<?php 

	
	$fileName = $_SERVER['HTTP_X_FILENAME'];
	$fileSize = $_SERVER['CONTENT_LENGTH'];
	$fileType = $_SERVER['CONTENT_TYPE'];

	$newFileName = 'media_'.rand(10,100).'_'.$fileSize.'.'.array_pop(explode("/", $fileType));
	$filePath = 'uploads/'.$newFileName;

	/*file_put_contents(
		$filePath,
		//file_get_contents('php://input')
		fopen('php://input', 'r')
	);*/

	$response = array(
		'status' => 'true', 
		'message' => 'Successfuly Uploaded',
		'data' => array(
			'name_original' => $fileName, 
			'name_new' => $newFileName, 
			'name_transcoded' => $newFileName, 
			'size_original' => $fileSize, 
			'type_original' => $fileType, 
			'path' => $filePath, 
		)
	);


	echo json_encode($response);
	exit();


 ?>