<?php
    include_once 'databaseConn.php';

    class Tutor {
        
        public static function getAllInfo($tutor_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT * FROM Tutor
                WHERE Tutor.id='$tutor_id'";
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }

        //input_array include 
        public static function createRequest($input_array) {
            $result = 
        }

    }

}