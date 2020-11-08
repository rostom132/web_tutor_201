<?php
    session_start();
    $CONFIG = parse_ini_file('../../secret/config.ini');

    if(isset($_FILES['file']['name'])){
        
        $filename = $_FILES['file']['name']; 
        
        $imageFileType = pathinfo($filename,PATHINFO_EXTENSION);
        $imageFileType = strtolower($imageFileType);
        $location = $CONFIG['avatars_dir'].$_SESSION['user_id'].".".$imageFileType;
        
        $valid_extensions = array("jpg","jpeg","png");
     
        $response = 0;
        if(in_array(strtolower($imageFileType), $valid_extensions)) {
            $exist_avatar = glob( $CONFIG['avatars_dir'] .$_SESSION['user_id'] .".*");
            if (count($exist_avatar) > 0) {
                unlink($exist_avatar[0]);
            }
            if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
                $response = $location;
            }
        }
    }
    echo $response;
?>