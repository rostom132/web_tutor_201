<?php
    include_once 'databaseConn.php';

    class Parents {

        /**
         * Get information of one parent
         *
         * @param integer $parrent_id id of the parent
         * 
         * @return array info include (fname, lname, email, check_email, birth, gender, phone_number)
         */ 
        public static function getInfo($parent_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT first_name AS fname, last_name AS lname, email AS check_email ,date_of_birth AS birth, gender, phone_number FROM Parent
                WHERE Parent.id='$parent_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }

        /**
         * update information of one parent
         *
         * @param integer $parent_id id of the parent
         * @param array $input_data include all info mation that want to update with these keys (first_name, last_name, email, birth_of_date, gender,
         *              phone_number)
         * 
         * @return boolean update status
         */ 
        public static function updateParent($parent_id, $input_data) {
            $sql = "";
            foreach ($input_data AS $col=>$val) {
                if ($sql != "") $sql.= ", ";
                $sql .= "$col = '$val'";
            }

            $result_parent = $GLOBALS['db_conn']->queryData(
                "UPDATE Parent
                SET " .$sql
                ." WHERE id='$parent_id'"
            );
            
            if (!$result_parent) return false;
            return true;
        }

    }

?>