<?php
    include_once 'databaseConn.php';

    class Subject {
        
        public static function getAll() {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT id, CONCAT(name, '_', grade, '_', teaching_language) AS name FROM `subject`"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }

    }
        
?>