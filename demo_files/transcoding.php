<?php 

	$response = array(
        'status' => 'true', 
        'message' => 'Successfuly Uploaded',
        'data' => array(
            'duration' => '0.00', 
            'current_time' => '0.00', 
            'progress' => 100, 
        )
    );

    echo json_encode($response);

 ?>