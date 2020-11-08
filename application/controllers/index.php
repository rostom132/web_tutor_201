<?php
    session_start();

    include "autoAuthen.php";
    include "../views/header.html";

    $_SESSION['user_id'] = '1';
    $_SESSION['user_type'] = 'tutor';
    $_GET['page'] = 'infoTutor';

    if (AutoAuthen::rememberMe()){
        $_GET['nav'] = $_SESSION['user_type'];
    }
    else {
        $_GET['nav'] = '';
    }

    if (isset($_GET['nav'])){
        $nav = $_GET['nav'];
        include "../views/navbar$nav.html";
    }
    
    if (isset($_GET['page'])){
        $page = $_GET['page'];
        include "../views/$page.html";
    }
    //  Two main part of homepage body
    // include "../views/bodyBanner.html";
    // include "../views/counting.html";
    // include "../views/info.html";
    // include "../views/registerClass.html";
    include "../views/footer.html";
?>