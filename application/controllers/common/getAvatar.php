<?php

    include_once "../../secret/config.php";
    
    function getUserAvatar($user_id) {
        if (isset($user_id) && count(glob(Config::get()['avatar']['avatars_dir'] .$user_id.".*")) > 0){
            $dir = explode('/',glob(Config::get()['avatar']['avatars_dir'] .$user_id .".*")[0]);
            $name_of_avatar = end($dir);
            $avatar_dir = Config::get()['avatar']['avatars_dir_frontend'] .$name_of_avatar;
        } else {
            $avatar_dir = '';
        }
        return $avatar_dir;
    }
?>