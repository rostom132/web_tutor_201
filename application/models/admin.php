<?php
    include_once 'databaseConn.php';

    class Admin {
        public static function checkAdminCode($code) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT use_time FROM admincode
                WHERE code='$code'"
            );
            if(mysqli_num_rows($result)) {
                $use_time = (int)$GLOBALS['db_conn']->convertToArray($result)[0]['use_time'];
                if ($use_time == 0) return false;
                $use_time = $use_time - 1;
                $result = $GLOBALS['db_conn']->queryData(
                    "UPDATE admincode SET use_time='$use_time'
                    WHERE code='$code'"
                );
                return true;
            }
            return false;
        }
        

        /**
         * Create new info for admin
         *
         * @param integer $admin_id id of the admin
         * @param array input data
         * 
         * @return boolean status
         */ 
        public static function createInfo($admin_id, $input_data) {
            $columns=array_keys($input_data);
            $values=array_values($input_data);
            
            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO `admin` (`id`," ."`" .implode("`, `",$columns) ."`" .") 
                VALUES (".$admin_id .",'" . implode("', '", $values) . "' )"
            );
            if ($result) return true;
            return false;
        }

        /**
         * Get information of one admin
         *
         * @param integer $admin_id id of the admin
         * 
         * @return array info include (fname, lname, gender, phone_number)
         */ 
        public static function getInfo($admin_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT first_name AS fname, last_name AS lname, gender, phone_number FROM Admin
                WHERE Admin.id='$admin_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }

        /**
         * update information of one admin
         *
         * @param integer $admin_id id of the admin
         * @param array $input_data include all info mation that want to update with these keys (first_name, last_name,
         *              phone_number)
         * 
         * @return boolean update status
         */ 
        public static function updateAdmin($admin_id, $input_data) {
            $sql = "";
            foreach ($input_data AS $col=>$val) {
                if ($sql != "") $sql.= ", ";
                $sql .= "$col = '$val'";
            }

            $result_admin = $GLOBALS['db_conn']->queryData(
                "UPDATE Admin
                SET " .$sql
                ." WHERE id='$admin_id'"
            );
            
            if (!$result_admin) return false;
            return true;
        }


        public static function getAllEmails() {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT email FROM Admin"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }
    }

?>
