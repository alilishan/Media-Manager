<?php 

    $result_data = array(
        'name' => 'fakepath/faje.jpeg',
        'data' => "uploaded/",
        'type' => 'image',
        'message' => 'File Uploaded Successfully',
        'status' => 'true',
        'width' => '100px',
        'height' => '100px'
    );

    /*$result_data = array(
        'name' => 'fakepath/faje.jpeg',
        'message' => 'Unsupported File Format. Allowed file format is only(png, jpg, jpeg)',
        'status' => 'false'
    );*/

    echo json_encode($result_data);
            
            ?>