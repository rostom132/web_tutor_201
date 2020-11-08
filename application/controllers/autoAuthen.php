<?php
    include_once "../models/users.php";

    class AutoAuthen {

        public static function loginWithRemember($user) {
            $token =  bin2hex(random_bytes(20));
            User::storeTokenForUser($user, $token);
            $cookie = $user . ':' . $token;
            $mac = hash_hmac('sha256', $cookie, parse_ini_file('../../secret/config.ini')['secret_key']);
            $cookie .= ':' . $mac;
            setcookie('rememberme', $cookie);
        }

        public static function rememberMe() {
            $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
            if ($cookie != '') {
                list ($user, $token, $mac) = explode(':', $cookie);
                if (!hash_equals(hash_hmac('sha256', $user . ':' . $token, parse_ini_file('../../secret/config.ini')['secret_key']), $mac)) {
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

        public static function autoLogin($user) {
            $_SESSION['user_type'] = User::getUserType($user);
            $_SESSION['user_id'] = User::getId($user);
            $_SESSION['username'] = $user;
            error_log($_SESSION['username'].$_SESSION['user_id'].$_SESSION['user_type'], 3, '../my_errors.log');
        }

    }

?>