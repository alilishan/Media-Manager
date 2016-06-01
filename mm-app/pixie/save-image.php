<?php

    //print_r($_POST)
    $data = file_get_contents($_REQUEST['imgData']);

    //echo $_REQUEST['imgData'];

    file_put_contents($_REQUEST['name'].'.'.$_REQUEST['ext'], $data);

?>