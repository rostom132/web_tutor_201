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

        public static function getClassInfo($class_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT city, district, ward, no_students, gender_of_tutor, FORMAT(salary_per_lesson,'de_DE') AS  salary_per_lesson, no_lesson_per_week, time_per_lesson, user_id, description, topic, DATE_FORMAT(post_date,'%d/%m/%Y') as post_date FROM Class
                Where id='$class_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }

        public static function getClassOwner($class_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT first_name, parent.id FROM class JOIN parent ON class.user_id = parent.id
                WHERE class.id = '$class_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }

        public static function getWeakness($class_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT GROUP_CONCAT(CONCAT(name, '_', grade, '_', teaching_language)  SEPARATOR ', ') AS name FROM class
                JOIN weakness ON weakness.class_id = class.id
                JOIN subject ON subject.id = weakness.subject_id
                WHERE class.id = '$class_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0]['name'];
        }
    }

?>