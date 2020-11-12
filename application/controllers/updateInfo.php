<?php
    session_start();
    include_once '../../secret/config.php';

    /**
     * save avatar into server
     *
     * @param file $file the image file of avatar
     * 
     * @return string salt of user
     */ 
    function saveAvatar($file) {
        $filename = $file['name']; 
        $imageFileType = pathinfo($filename,PATHINFO_EXTENSION);
        $imageFileType = strtolower($imageFileType);
        $location = Config::get()['avatar']['avatars_dir'].$_SESSION['user_id'].".".$imageFileType;
        
        $valid_extensions = Config::get()['avatar']['valid_extentions'];
     
        $response = 0;
        if(in_array(strtolower($imageFileType), $valid_extensions)) {
            $exist_avatar = glob( Config::get()['avatar']['avatars_dir'] .$_SESSION['user_id'] .".*");
            if (count($exist_avatar) > 0) {
                unlink($exist_avatar[0]);
            }
            if(move_uploaded_file($file['tmp_name'],$location)){
                $response = $location;
            }
        }
        echo $response;
    }

    //Check if avatar file is comming
    if(isset($_FILES['file']['name'])) {
        saveAvatar($_FILES['file']);
    }

    if(isset($_POST['getExtentions'])) {
        echo (json_encode(Config::get()['avatar']['valid_extentions']));
    }
?>