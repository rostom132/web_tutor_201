<?php
    if (isset($_GET['page'])){
        $page = $_GET['page'];
        include "$page.php";
    }
    include "../views/header.html";
    include "../views/bodyBanner.html";
    include "../views/counting.html";
    include "../views/footer.html";
?>