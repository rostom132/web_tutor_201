<?php
    include_once "../models/users.php";

    class AutoAuthen {

        /**
         * Remember user status when user choose 'Remember me'
         *
         * @param string $user name of user
         */ 
        public static function loginWithRemember($user) {
            $token =  bin2hex(random_bytes(20));
            User::storeTokenForUser($user, $token);
            $cookie = $user . ':' . $token;
            $mac = hash_hmac('sha256', $cookie, Config::get()['secret_key']);
            $cookie .= ':' . $mac;
            setcookie('rememberme', $cookie, time()+60*60*24,"/");
        }

        /**
         * Check if user have token (which mean the user choosed 'Remember me')
         * 
         * @return boolean true if the user has token
         */ 
        public static function rememberMe() {
            $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
            if ($cookie != '') {
                list ($user, $token, $mac) = explode(':', $cookie);
                if (!hash_equals(hash_hmac('sha256', $user . ':' . $token, Config::get()['secret_key']), $mac)) {
                    return false;
                }
                $usertoken = User::getToken($user);
                if (hash_equals($usertoken, $token)) {
                    AutoAuthen::autoLogin($user);
                    return true;
                }
            }
            return false;
        }

        /**
         * Login the user when recognize that the user has token
         * 
         * @param string $user name of user
         */ 
        public static function autoLogin($user) {
            $_SESSION['user_type'] = User::getUserType($user);
            $_SESSION['user_id'] = User::getId($user);
            $_SESSION['username'] = $user;
        }

    }
?>