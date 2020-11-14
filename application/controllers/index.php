<?php
    session_start();

    include '../../secret/config.php';
    include "./common/autoAuthen.php";
    include "../views/header.html";

    AutoAuthen::rememberMe();
    // else echo "andsakld";

    $_SESSION['user_id'] = '2';
    $_SESSION['username'] = 'khoangu';
    $_SESSION['user_type'] = 'parent';

    
    if (isset($_SESSION['user_type'])){
        $nav = $_SESSION['user_type'];
        include_once "../views/navbar_$nav.html";
    } else {
        include_once "../views/navbar.html";
    }
    
    // if (isset($_SESSION['user_type']))error_log($_SESSION['username']."   ".$_SESSION['user_type'], 3, '../my_errors.log');
    // if (isset($_SESSION['user_type'])) {
    //     include_once "../views/bodyBanner.html";
    // } else 
    if (isset($_GET['page']) && in_array($_GET['page'],Config::getPermission()['common'])){
        $page = $_GET['page'];
        include_once "../views/$page.html";
    } else if (isset($_GET['page']) && isset($_SESSION['user_type'])){
        $page = $_GET['page'];
        if (in_array($page, Config::getPermission()[$_SESSION['user_type']])){
            include_once "../views/$page.html";
        } else {
            include_once "../views/formLogin.html";
        }
    } else {
        include_once "../views/formLogin.html";
        include_once "../views/counting.html";
    }
    
    //  Two main part of homepage body
    //include "../views/bodyBanner.html";
    //include "../views/counting.html";
    //include "../views/classView.html";
    include "../views/footer.html";
?>