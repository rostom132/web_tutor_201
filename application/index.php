<?php
    if (isset($_GET['page'])){
        $page = $_GET['page'];
        include "$page.php";
    }
    include "./views/footer.html";
?>