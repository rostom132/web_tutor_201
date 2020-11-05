<?php
    include_once 'databaseConn.php';

    class Classs {

        public static function getNumberOfClass() {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT id FROM Class"
            );
            return mysqli_num_rows($result);
        }

        public static function getNumberOfClassFilter($input_array) {
            $sql = '';
            foreach ($input_array AS $col=>$val) {
                if ($sql != '') $sql.= ' and ';
                $sql .= "$col LIKE '$val'";
            }

            $result = $GLOBALS['db_conn']->queryData("SELECT id FROM Class WHERE " .$sql);
            return mysqli_num_rows($result);
        }

        public static function getFirst10Classes($current_page, $limit) {
            $start = ($current_page - 1) * $limit;
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT * FROM class LIMIT $start, $limit"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }
        
    }

?>

