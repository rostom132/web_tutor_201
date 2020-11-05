<?php
    include "../views/header.html";
    if (isset($_GET['page'])){
        $page = $_GET['page'];
        include "$page.php";
    }
    //  Two main part of homepage body
    //include "../views/bodyBanner.html";
    //include "../views/counting.html";
    include "../views/classView.html";
    include "../views/footer.html";
?>