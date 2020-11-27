<?php
    include_once 'databaseConn.php';

    class Classs {
        public static function getNumberOfClass() {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT id FROM Class"
            );
            if($result->num_rows != 0) {
                return mysqli_num_rows($result);
            }
            else {
                return "0";
            }
        }

        public static function getNumberOfClassFilter($input_array) {
            $sql = '';
            if(sizeof($input_array) > 0) {
                $sql .= "WHERE ";
            }
            foreach ($input_array AS $col=>$val) {
                if ($sql != "WHERE ") $sql.= ' and ';
                $sql .= "$col LIKE '$val'";
            }
            $temp = "SELECT class.id, class.district, class.no_students, class.gender_of_tutor, class.description, class.topic, class.post_date, class.salary_per_lesson, class.user_id FROM class JOIN weakness ON class.id = weakness.class_id " .$sql;
            $temp.=" GROUP BY class.id, class.district, class.no_students, class.gender_of_tutor, class.description, class.topic, class.post_date, class.salary_per_lesson, class.user_id";
            $result = $GLOBALS['db_conn']->queryData($temp);
            if($result->num_rows != 0) {
                return mysqli_num_rows($result);
            }
            else {
                return "0";
            }
        }

        public static function getLimitClasses($current_page, $limit) {
            $start = ($current_page - 1) * $limit;
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT class.id, class.district, class.no_students, class.gender_of_tutor, class.description, class.topic, class.post_date, class.salary_per_lesson, class.user_id FROM class LIMIT $start, $limit"
            );
            if($result->num_rows != 0) {
                return $GLOBALS['db_conn']->convertToArray($result);
            }
            else {
                return "0";
            }
        }

        public static function getLimitClassesFilter($input_array, $current_page, $limit) {
            $start = ($current_page - 1) * $limit;
            $prefix ="SELECT class.id, class.district, class.no_students, class.gender_of_tutor, class.description, class.topic, class.post_date, class.salary_per_lesson, class.user_id FROM class JOIN weakness ON class.id = weakness.class_id ";
            $postfix = " GROUP BY class.id, class.district, class.no_students, class.gender_of_tutor, class.description, class.topic, class.post_date, class.salary_per_lesson, class.user_id";
            $sql = null;
            if(sizeof($input_array) > 0) {
                $prefix .= "WHERE ";
            }
            $sql .= $prefix;
            foreach ($input_array AS $col=>$val) {
                if ($sql !=  $prefix) $sql.= ' and ';
                $sql .= "$col LIKE '$val'";
            }
            $sql .= $postfix;
            $sql.= " LIMIT $start, $limit";
            $result = $GLOBALS['db_conn']->queryData($sql);
            if($result->num_rows == 0) {
                return "0";
            }
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

        public static function getWeaknessOfClass($class_list) {
            $str = null;
            for($i = 0; $i < sizeof($class_list); $i++) {
                if($i < sizeof($class_list) - 1) {
                    $str .= "'".$class_list[$i]."',";
                }
                else {
                    $str .= "'".$class_list[$i]."'";
                }
            }
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT class.id ,GROUP_CONCAT(CONCAT(name,'_', grade,'_', teaching_language)  SEPARATOR ', ') AS name FROM class
                JOIN weakness ON weakness.class_id = class.id
                JOIN subject ON subject.id = weakness.subject_id
                GROUP BY class.id
                HAVING class.id IN ($str)"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }

        public static function getDetaiClassInfo($class_id){
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT parent.first_name as fname, parent.last_name as lname, parent.email, parent.phone_number, class.no_students, class.gender_of_tutor, class.salary_per_lesson as salary, class.no_lesson_per_week as no_lesson, class.address, class.ward, class.district FROM class 
                JOIN parent ON class.user_id = parent.id
                Where class.id = '$class_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }

        public static function getAvailableTime($class_id){
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT  GROUP_CONCAT(CONCAT('(' ,TIME_FORMAT(`start_time`, '%H:%i'), '-', TIME_FORMAT(`end_time`, '%H:%i'), ') ', `date`) SEPARATOR ', ') as time FROM classschedule
                WHERE class_id = '$class_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }
    }

?>