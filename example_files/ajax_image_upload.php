<?php


        $media_type = $_FILES['file']['type'];
        $split_media_type = explode('/', $media_type);

        if($split_media_type[0] == 'image')
        {
            $type = $split_media_type[0];

            $media = 'images';
        }
        else if($split_media_type[0] == 'video')
        {
            $type = $split_media_type[0];

            $media = 'videos';
        }
        else
        {
            $type = 'page';

            $media = 'pages';
        }


        echo $media. ' ' .$type;
        exit;



?>
