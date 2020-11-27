<?php
    session_start();

    include '../../secret/config.php';
    include "./common/autoAuthen.php";

    $page_content = array();

    AutoAuthen::rememberMe();

    // $_SESSION['user_id'] = '1';
    // $_SESSION['username'] = 'tien';
    // $_SESSION['user_type'] = 'tutor';

    array_push($page_content , "../views/header.html");
    if (isset($_SESSION['user_type'])){
        $nav = $_SESSION['user_type'];
        array_push($page_content ,"../views/navbar_$nav.html");
    } else {
        array_push($page_content , "../views/navbar.html");
    }


    $page = isset($_GET['page']) ? $_GET['page']: '';

    switch(true) {
        case !isset($_GET['page']):
            header("Location: ".Config::getConfig()['domain'] ."bodyBanner");
            break;

        case (!isset($_SESSION['user_type']) && in_array($_GET['page'],Config::getPermission()['common'])):
            array_push($page_content , "../views/$page.html");
            break;
        case (!isset($_SESSION['user_type']) && !in_array($_GET['page'],Config::getPermission()['common'])):
            header("Location: ".Config::getConfig()['domain'] ."formLogin");
            break;
        case in_array($page, Config::getPermission()['loginCommon']):
        case in_array($page, Config::getPermission()[$_SESSION['user_type']]):
            array_push($page_content , "../views/$page.html");
            break;
        default:
            header("Location: ".Config::getConfig()['domain'] ."bodyBanner");
    }

    if (in_array($_GET['page'],Config::get()['pageGoWithCouting'])){
        array_push($page_content , "../views/counting.html");
    }
    
    array_push($page_content , "../views/footer.html");

    foreach ($page_content as $value) {
        include_once $value;
    }
?>