<?php
    session_start();
    $_SESSION['user_id'] = 1;
    include "../views/header.html";

    if (isset($_GET['page'])){
        $page = $_GET['page'];
        include "$page.html";
    }
    //  Two main part of homepage body
    // include "../views/bodyBanner.html";
    // include "../views/counting.html";
    include "../views/info.html";
    // include "../views/registerClass.html";
    include "../views/footer.html";
?>