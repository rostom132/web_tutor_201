<?php

    include_once "../../secret/config.php";

    function getAva(){
        if (count(glob(Config::get()['avatar']['avatars_dir'] .$_SESSION['user_id'] .".*")) > 0){
            $dir = explode('/',glob(Config::get()['avatar']['avatars_dir'] .$_SESSION['user_id'] .".*")[0]);
            $name_of_avatar = end($dir);
            $avatar_dir = Config::get()['avatar']['avatars_dir_frontend'] .$name_of_avatar;
        } else {
            $avatar_dir = '';
        }
        return $avatar_dir;
    }

    function getUserAvatar($user_id) {
        if (count(glob(Config::get()['avatar']['avatars_dir'] .$user_id.".*")) > 0){
            $dir = explode('/',glob(Config::get()['avatar']['avatars_dir'] .$user_id .".*")[0]);
            $name_of_avatar = end($dir);
            $avatar_dir = Config::get()['avatar']['avatars_dir_frontend'] .$name_of_avatar;
        } else {
            $avatar_dir = '';
        }
        return $avatar_dir;
    }
?>