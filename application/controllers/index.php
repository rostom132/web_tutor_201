<?php
    session_start();

    include '../../secret/config.php';
    include "./common/autoAuthen.php";

    $page_content = array();

    AutoAuthen::rememberMe();

    // $_SESSION['user_id'] = '6';
    // $_SESSION['username'] = 'tienn';
    // $_SESSION['user_type'] = 'tutor';

    array_push($page_content , "../views/header.html");
    if (isset($_SESSION['user_type'])){
        $nav = $_SESSION['user_type'];
        array_push($page_content ,"../views/navbar_$nav.html");
    } else {
        array_push($page_content , "../views/navbar.html");
    }
    
    if (isset($_GET['page']) && in_array($_GET['page'],Config::getPermission()['common'])){
        $page = $_GET['page'];
        array_push($page_content , "../views/$page.html");
        if (in_array($_GET['page'],Config::get()['pageGoWithCouting'])){
            array_push($page_content , "../views/counting.html");
        }
    } else if (isset($_GET['page']) && isset($_SESSION['user_type'])){
        $page = $_GET['page'];
        if (in_array($page, Config::getPermission()[$_SESSION['user_type']])){
            array_push($page_content , "../views/$page.html");
        } else {
            header("Location: ".Config::getConfig()['domain'] ."formLogin");
        }
    } else {
        header("Location: ".Config::getConfig()['domain'] ."bodyBanner");
    }
    
    array_push($page_content , "../views/footer.html");

    foreach ($page_content as $value) {
        include_once $value;
    }
?>