<?php
    include_once "../../secret/config.php";

    class Validate {

        static function checkIsset($array_input, $array_check) {
            foreach ($array_check as $value) {
                if (!isset($array_input[$value])) return false;
            }
            return true;
        }

        static function validateInfo($input_info) {
            $failValidate = array();
            foreach ($input_info as $col => $value) {
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

        static function validateRegiter($input_data) {
            if (!Validate::checkIsset($input_data, ['email'])) return 'WRONG ELEMENT';
            $failValidate = array();
            if ( preg_match(Config::get()['validateRegistor']['type'], $input_data['type'])) {
                $role  = $input_data['type'];
                if (!Validate::checkIsset($input_data[$role], ['username','password'])) return 'WRONG ELEMENT';
                if( !preg_match(Config::get()['validateRegistor']['authen']['username'], $input_data[$role]['username'])){
                    array_push($failValidate, 'Username');
                }
                if( !preg_match(Config::get()['validateRegistor']['authen']['password'], $input_data[$role]['password'])){
                    array_push($failValidate, 'Password');
                }
                if (isset($input_data['code']) && !preg_match(Config::get()['validateRegistor']['code'], $input_data['code']) ) {
                    array_push($failValidate, 'Security Code');
                }
            } else {
                array_push($failValidate, 'Type of User');
            }
            return $failValidate;
        }

        

        static function validatePass($password) {
            return preg_match(Config::get()['validateInfo']['password'], $password);
        }

    }

?>