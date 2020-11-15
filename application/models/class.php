<?php
    include_once 'databaseConn.php';

    class Classs {
        function console_log( $data ){
            echo '<script>';
            echo 'console.log('. json_encode( $data ) .')';
            echo '</script>';
          }
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

        public static function getLimitClasses($current_page, $limit) {
            $start = ($current_page - 1) * $limit;
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT * FROM class LIMIT $start, $limit"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }
        public static function getLimitClassesFilter($input_array, $current_page, $limit) {
            $start = ($current_page - 1) * $limit;
            $sql ="SELECT * FROM class WHERE ";
            foreach ($input_array AS $col=>$val) {
                if ($sql != 'SELECT * FROM class WHERE ') $sql.= ' and ';
                $sql .= "$col LIKE '$val'";
            }
            $sql.= " LIMIT $start, $limit";
            $result = $GLOBALS['db_conn']->queryData($sql);
            return $GLOBALS['db_conn']->convertToArray($result);
        }
    }

?>

