<?php
    include '../../secret/config.php';

    if (isset($_GET['domain']) && $_GET['domain']=='true'){
        echo (Config::getConfig()['domain']);
    }
?>