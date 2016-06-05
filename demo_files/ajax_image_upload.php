<?php 
        /*print_r ($_FILES );
        exit;*/
            foreach ($_FILES as $index=> $val)
            {
            
                    $upload_file         = explode('.', $val['name'][0]);
                    $find_ext            = sizeof($upload_file);
                    $extension           = $upload_file[$find_ext - 1];
                    $size                = $val['size'][0];
                    $get_upload_max_size = ini_get('upload_max_filesize');
                        $actual_file_path = "main_" . rand() . "." . $extension;
                        
                        if ($extension == "jpg" || $extension == "JPG" || $extension == "jpeg" || $extension == "JPEG" || $extension == "png" || $extension == "PNG" )
                        {
                            $res = move_uploaded_file($val['tmp_name'][0], "uploaded/" . $actual_file_path);
                            
                            $image_path = "uploaded/" . $actual_file_path;
                            
                            $path = "uploaded/" . $actual_file_path;
                            
                            list($width, $height) = getimagesize($image_path);  
                            
                            //echo $height."-"$width;
                            
                            
                            if($res)
                            {
                                $data= array(
                                    'image_path' =>$path,
                                    'status_id' => 2, //Active
                                );
                                
                                $result_data = array(
                                    'name' => $actual_file_path,
                                    'data' => "uploaded/" . $actual_file_path,
                                    'type' => 'image',
                                    'message' => 'File Uploaded Successfully',
                                    'status' => 'true',
                                    'width' => $width,
                                    'height' => $height
                                );
                                
                            }
                            else
                            {
                                
                                $result_data = array(
                                    'name' => $actual_file_path,
                                    'message' => 'Could not Upload the File',
                                    'status' => 'false'
                                );
                            }
                        } 
                        else
                        {
                            $result_data = array(
                                'name' => $actual_file_path,
                                'message' => 'Unsupported File Format. Allowed file format is only(png,jpg,jpeg)',
                                'status' => 'false'
                            );
                        }
                    } //$max_size > $size
                
                echo json_encode($result_data);
            
            ?>