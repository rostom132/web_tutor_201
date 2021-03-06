<?php

    include_once "../models/users.php";

    class Authen {

        /**
         * Login the user 
         * 
         * @param string $user name of user
         */ 
        public static function login($user) {
            $_SESSION['user_type'] = User::getUserType($user);
            $_SESSION['user_id'] = User::getId($user);
            $_SESSION['username'] = $user;
        }

        /**
         * Logout the user 
         * 
         * @param string $user name of user
         */ 
        public static function logout() {
            session_unset();
            if (isset($_COOKIE['rememberme'])) {
                unset($_COOKIE['rememberme']); 
                setcookie('rememberme', null, -1, '/'); 
                return true;
            } else {
                return false;
            }
        }
    }
?>