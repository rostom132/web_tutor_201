<?php
    include_once 'databaseConn.php';

    class User {

        public static function isUsernameExist($username) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT * FROM UserInfo WHERE username='$username'"
            );

            if (mysqli_num_rows($result) > 0) {
                return true;
            } else {
                return false;
            }
        }

        public static function authorize($username,$password) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT id, user_type FROM UserInFo
                WHERE UserInfo.username='$username'
                AND UserInfo.password='$password'"
            );
            if (mysqli_num_rows($result)==0) {
                return false;
            }
            return $GLOBALS['db_conn']->convertToArray($result);
        }
        
        public static function getInfo($id) {
            $user_query = $GLOBALS['db_conn']->queryData(
                "SELECT user_type FROM UserInfo WHERE UserInfo.id='" .$id ."'"
            );
            $user_type = mysqli_fetch_assoc($user_query)['user_type'];
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT * FROM $user_type WHERE $user_type.id='$id'"
            );
            return $GLOBALS['db_conn']->convertToArray($result);
        }

        public static function register($input_array) {
            $columns=array_keys($input_array);
            $values=array_values($input_array);
            
            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO `UserInfo` (" ."`" .implode("`, `",$columns) ."`" .") 
                VALUES ('" . implode("', '", $values) . "' )"
            );
            if ($result) return $GLOBALS['db_conn']->getLastId();
            return false;
        }

    }
?>