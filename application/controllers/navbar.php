<?php
    session_start();
    include_once "./common/getAvatar.php";
    include_once "./common/authentication.php";

    if(isset($_GET['getAva']) && $_GET['getAva'] == 'true') {
        echo(getUserAvatar($_SESSION['user_id'])); 
    }

    if(isset($_GET['logout']) && $_GET['logout'] == 'true'){
        $result = Authen::logout() ? 'success' : 'fail';
        echo $result;
    }
?>