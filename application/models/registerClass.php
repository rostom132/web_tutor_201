<?php
	include_once "databaseConn.php";

	class registerClass {
		/**
         * Create new class info
         *
         * @param integer $tutor_id id of the tutor
         * @param array input data
         * 
         * @return boolean status
         */ 
		public static function createClass($parent_id, $input_data) {
			$columns = array_keys($input_data);
            $values = array_values($input_data);
            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO `class` (`user_id`," ."`" .implode("`, `",$columns) ."`" .")
                VALUES (" .$parent_id .",'" . implode("', '", $values) . "' )"
            );
            if($result) {
                $last_insert_id = $GLOBALS['db_conn']->getNewInsertedId();
                return $last_insert_id;
            }
            else return 'FAIL';
        }
        
        /**
         * Create new class info
         *
         * @param integer $class_id id of the class
         * @param array input data
         * 
         * @return boolean create status
         */ 
        public static function createWeakness($input_data, $class_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO `Weakness` (`class_id`, `subject_id`)
                VALUES (" ."'$class_id','" .implode("'),('".$class_id ."','", $input_data) ."')"
            );
            if (!$result) return false;
            return true;
        }

        /**
         * Create new class info
         *
         * @param integer $class_id id of the class
         * @param array input_data
         * 
         * @return boolean create status
         */ 
        public static function createSchedule($input_data, $class_id) {
            $arr = array();
            foreach($input_data as $el) {
                $temp = "'" .$el['date'] . "'," . "'" .$el['start_time']."'," . "'" .$el['end_time'] ."'";
                array_push($arr, $temp);
            }
            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO `classschedule` (`class_id`, `date`, `start_time`, `end_time`)
                VALUES (" ."'$class_id'," .implode("),('".$class_id ."',", $arr) .")"
            );
            if (!$result) return false;
            return true;
        }
	}
?>