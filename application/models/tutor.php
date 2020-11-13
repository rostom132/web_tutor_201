<?php
    include_once 'databaseConn.php';

    class Tutor {
        
        /**
         * Get information of one tutor
         *
         * @param integer $tutor_id id of the tutor
         * 
         * @return array info include (fname, lname, email, check_email, birth, gender, phone_number, job, description, account_verified, language)
         */ 
        public static function getInfo($tutor_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT first_name AS fname, last_name AS lname, email AS check_email ,date_of_birth AS birth, gender, phone_number, present_job AS job, description, language FROM Tutor
                WHERE Tutor.id='$tutor_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }
        
        /**
         * Get information of specialitu of one tutor
         *
         * @param integer $tutor_id id of the tutor
         * 
         * @return array array of speciality id
         */ 
        public static function getSpecialize($tutor_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT subject_id AS id FROM Specialize
                WHERE tutor_id='$tutor_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }

        /**
         * update information of one tutor
         *
         * @param integer $tutor_id id of the tutor
         * @param array $input_data include all info mation that want to update with these keys (first_name, last_name, email, birth_of_date, gender,
         *              phone_number, present_job, description, language)
         * 
         * @return boolean update status
         */ 
        public static function updateTutor($tutor_id, $input_data) {
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
            
            if (!$result_tutor) return false;
            return true;
        }

        /**
         * Update speciality of one tutor
         *
         * @param integer $tutor_id id of the tutor
         * @param array $speciality array of subject_id
         * 
         * @return boolean update status
         */ 
        public static function updateSpeciality($tutor_id, $speciality) {
            $remove = $GLOBALS['db_conn']->queryData(
                "DELETE FROM specialize WHERE tutor_id=$tutor_id"
            );
            $result = true;
            if (!empty($speciality)) {
                $result = $GLOBALS['db_conn']->queryData(
                    "INSERT INTO `specialize` (`tutor_id`, `subject_id`)
                    VALUES (" ."'$tutor_id','" .implode("'),('".$tutor_id ."','", $speciality) ."')"
                );
            }
            if (!$result) return false;
            return true;
        }

    }

?>