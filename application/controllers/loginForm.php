<?php
    include_once "../models/users.php";

    function checkLogin($username, $password) {
        if (User::authorize($username, $password)) {
            $user_info = User::getInfo($username);
            $_SESSION['user_type'] = $user_info['user_type'];
            $_SESSION['user_id'] = $user_info['user_id'];
            echo(json_encode($user_info));
        }
        else echo 'an lone zoi';
    }

    checkLogin('tien','tientien');

?>