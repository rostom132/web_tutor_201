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

        /**
         * Create new info for tutor
         *
         * @param integer $tutor_id id of the tutor
         * @param array input data
         * 
         * @return boolean create status
         */ 
        public static function createInfo($tutor_id, $input_data) {
            $columns=array_keys($input_data);
            $values=array_values($input_data);

            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO `Tutor` (`id`," ."`" .implode("`, `",$columns) ."`" .") 
                VALUES (" .$tutor_id .",'" . implode("', '", $values) . "' )"
            );
            if ($result) return true;
            return false;
        }

        /**
         * Get group concat of speciality of one tutor
         *
         * @param integer $tutor_id id of the tutor
         * 
         * @return array speciality concat
         */ 
        public static function getSpecializeGroupConcat($tutor_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT GROUP_CONCAT(CONCAT(name,'_', grade,'_', teaching_language)  SEPARATOR ', ') as subject FROM Specialize
                JOIN subject ON subject.id = specialize.subject_id
                                WHERE tutor_id='$tutor_id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0];
        }

        /**
         * Insert tutor id and class id in to registered class table
         * 
         * @param integer $tutor_id id of the tutor
         * @param integer $class_id id of the class
         * 
         * @return boolean status
         */ 
        public static function registerClass($tutor_id, $class_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO registeredclass (`tutor_id`, `class_id`) VALUES ('$tutor_id', '$class_id')"
            );
            if ($result) return true;
            return false;
        }

        /**
         * Check if the class is registered by the tutor
         *
         * @param integer $tutor_id id of the tutor
         * @param integer $class_id id of the class
         * 
         * @return boolean status
         */ 
        public static function isRegistered($tutor_id, $class_id) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT * FROM registeredclass WHERE tutor_id='$tutor_id' and class_id='$class_id'"
            );
            if($result->num_rows != 0) {
                return true;
            }
            else {
                return false;
            }
        }

    }

?>