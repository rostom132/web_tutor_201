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

        static function validateClassInfo($input_data, $type) {
            $failValidate = array();
            switch($type) {
                case "registerClass":
                    $count = 0;
                    foreach($input_data as $col => $values) {
                        if(in_array($col, array_keys(Config::get()['validateClassInfo'][$type]))) {
                            if(!preg_match(Config::get()['validateClassInfo'][$type][$col], trim($values))) {
                                array_push($failValidate, $col);
                            }
                            else $count += 1;
                        }
                        else {
                            // error_log($col, 3, "./log.log");
                            return 'WRONG ELEMENT';
                        }
                    }
                    $length_to_check = sizeof(Config::get()['validateClassInfo'][$type]);
                    if($count !== $length_to_check) return 'WRONG ELEMENT';
                    break;
                case "registerSchedule":
                    $count = 0;
                    if(sizeof($input_data) > 0) {
                        foreach($input_data as $el) {
                            foreach($el as $col => $values) {
                                if(in_array($col, array_keys(Config::get()['validateClassInfo'][$type]))) {
                                    if(!preg_match(Config::get()['validateClassInfo'][$type][$col], $values)) {
                                        array_push($failValidate, "Time Schedule");
                                        // error_log($col, 3, "./log.log");
                                        return $failValidate;
                                    } else $count += 1;
                                }
                                else {
                                    // error_log($col, 3, "./log.log");
                                    return 'WRONG ELEMENT';
                                }
                            }
                            // Check if there is all 3 fields
                            $length_to_check = sizeof(Config::get()['validateClassInfo'][$type]);
                            if($count !== $length_to_check) return 'WRONG ELEMENT';
                            // Check if end_time - start_time >= 2
                            list($start_hour, $start_minute, $start_second) = explode(":", $el["start_time"]);
                            list($end_hour, $end_minute, $end_second) = explode(":", $el["end_time"]);
                            if($start_minute !== "30") {
                                if(intval($end_hour) - intval($start_hour) < 2) {
                                    array_push($failValidate, "Time Schedule");
                                    // error_log("00 lower than 2", 3, "./log.log");
                                    return $failValidate;
                                }
                            }
                            else if($start_minute === "30") {
                                if((intval($end_hour) - intval($start_hour) < 2) && $end_minute === "30") {
                                    array_push($failValidate, "Time Schedule");
                                    // error_log("30 lower than 2", 3, "./log.log");
                                    return $failValidate;
                                }
                                else if((intval($end_hour) - intval($start_hour) < 3) && $end_minute !== "30") {
                                    array_push($failValidate, "Time Schedule");
                                    // error_log("30 lower than 3", 3, "./log.log");
                                    return $failValidate;
                                }
                            }
                        }
                    }
                    else array_push($failValidate, "Time Schedule");
                    break;
                case "registerWeakness":
                    $count = 0;
                    if(sizeof($input_data) > 0) {
                        foreach($input_data as $el) {
                            foreach($el as $col => $values) {
                                if(in_array($col, array_keys(Config::get()['validateClassInfo'][$type]))) {
                                    if(!preg_match(Config::get()['validateClassInfo'][$type][$col], $values)) {
                                        array_push($failValidate, "Subject");
                                        return $failValidate;
                                    }
                                    else $count += 1;
                                }
                                else {
                                    // error_log($col, 3, "./log.log");
                                    return 'WRONG ELEMENT';
                                }
                            }
                            $length_to_check = sizeof(Config::get()['validateClassInfo'][$type]);
                            if($count !== $length_to_check) return 'WRONG ELEMENT';
                        }
                    }
                    else array_push($failValidate, "Subject");
                    break;
            }
            return $failValidate;
        }

        static function validatePass($password) {
            return preg_match(Config::get()['validateInfo']['password'], $password);
        }

    }

?>