<?php
    include_once 'databaseConn.php';

    class Parents {

        /**
         * Get information of one parrent
         *
         * @param integer $parrent_id id of the tutor
         * 
         * @return array info include (fname, lname, email, check_email, birth, gender, phone_number, job, description, account_verified, language)
         */ 
        public static function getInfo($parent_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT first_name AS fname, last_name AS lname, email AS check_email ,date_of_birth AS birth, gender, phone_number FROM Parent
                WHERE Parent.id='$parent_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }

    }

?>