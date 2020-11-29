<?php
    session_start();
    include_once "../models/users.php";
    include_once "./common/autoAuthen.php";
    include_once "./common/authentication.php";
    include_once "./common/validateInfo.php";

    /**
     * Authorization
     *
     * @param string $username name of user
     * @param string $password pass of user
     * 
     * @return string status of authorization
     */ 
    function checkLogin($loginData) {
        if(!Validate::validateLogin($loginData)) return 'sai format roi';
        if (User::authorize($loginData['username'], $loginData['password'])) {
            Authen::login($loginData['username']);
            if ($loginData['rememberMe'] == 'true') {
                AutoAuthen::loginWithRemember($loginData['username']);
            }
            return 'success';
        }
        return 'login fail!';
    }

    //Check for login request
    if(isset($_POST['loginData'])) {
        $loginData = $_POST['loginData'];
        echo (checkLogin($loginData)); 
    }
?>