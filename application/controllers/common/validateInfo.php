<?php
    include_once "../../../secret/config.php";

    class Validate {

        static function validateInfo($inputInfo) {
            $failValidate = array();
            foreach ($inputInfo as $col => $value) {
                if ( in_array($col, array_keys(Config::get()['validateInfo']['common'])) ) {
                    if ( !preg_match(Config::get()['validateInfo']['common'][$col], $value)) {
                        array_push($failValidate, $col);
                    }
                } elseif( isset($_SESSION['user_type']) && in_array($col, array_keys(Config::get()['validateInfo'][$_SESSION['user_type']])) ) {
                    if ( !preg_match(Config::get()['validateInfo'][$_SESSION['user_type']][$col], $value) ) {
                        array_push($failValidate, $col);
                    }
                } else {
                    return 'WRONG ELEMENT';
                }
            }
            return $failValidate;
        }

        static function validatePass($password) {
            return preg_match(Config::get()['validateInfo']['password'], $password);
        }

    }

?>