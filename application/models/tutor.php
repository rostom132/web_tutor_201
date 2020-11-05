<?php
    include_once 'databaseConn.php';

    class Tutor {
        
        public static function getAllInfo($tutor_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT first_name AS fname, last_name AS lname, email AS check_email ,birth_of_date,gender,phone_number,present_job AS job,description,account_verified,language FROM Tutor
                WHERE Tutor.id='$tutor_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }

        public static function getSpecialize($tutor_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT subject_id FROM Specialize
                WHERE tutor_id='$tutor_id'"
            );
            $subject = $GLOBALS['db_conn']->convertToArray($result);
            $sql = "";

            foreach ($subject as $a) {
                if ($sql != "") {
                    $sql .= ", ";
                }
                $sql .= $a['subject_id'];
            }
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT id FROM subject WHERE id IN (" .$sql ." )"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }

        public static function update($tutor_id, $input_data, $speciality, $password) {
            $sql = "";
            foreach ($input_data AS $col=>$val) {
                if ($sql != "") $sql.= ", ";
                $sql .= "$col = '$val'";
            }

            $result_tutor = $GLOBALS['db_conn']->queryData(
                "UPDATE Tutor
                SET " .$sql
                ." WHERE id='$tutor_id'"
            );

            error_log("UPDATE Tutor
            SET " .$sql
            ." WHERE tutor_id='$tutor_id'", 3, "../my-errors.log");
            
            if (!$result_tutor) return false;
            return true;
        }

    }

?>