<?php
    include_once 'databaseConn.php';

    class User {

        /**
         * Get salt of one user
         *
         * @param string $username name of user
         * 
         * @return string salt of user
         */ 
        public static function getSalt($username) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT salt FROM UserInFo
                WHERE UserInfo.username='$username'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0]['salt'];
        }

        /**
         * Get password of one user
         *
         * @param string $username name of user
         * 
         * @return string password of user
         */ 
        public static function getPassword($username) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT password FROM UserInFo
                WHERE UserInfo.username='$username'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0]['password'];
        }

        /**
         * Get type of one user
         *
         * @param string $username name of user
         * 
         * @return string type of user
         */ 
        public static function getUserType($username) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT user_type FROM UserInFo
                WHERE UserInfo.username='$username'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0]['user_type'];
        }

        /**
         * Store the token whenever the user choose REMEMBER ME
         *
         * @param string $username name of user
         * @param string $token token of access
         * 
         * @return boolean status
         */ 
        public static function storeTokenForUser($username, $token) {
            $result = $GLOBALS['db_conn']->queryData(
                "UPDATE `UserInfo`
                SET token = '" .$token
                ."' WHERE username='$username'"
            );
            if (!$result) return false;
            return true;
        }

        /**
         * get the token check Auto Authen
         *
         * @param string $username name of user
         * 
         * @return string token of user
         */ 
        public static function getToken($username) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT token FROM UserInfo
                 WHERE username='$username'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0]['token'];
        }

        /**
         * get the id of user
         *
         * @param string $username name of user
         * 
         * @return string id of user
         */ 
        public static function getId($username) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT id FROM UserInfo
                 WHERE username='$username'"
            );
            return $GLOBALS['db_conn']->convertToArray($result)[0]['id'];
        }

        /**
         * Encrypt the password
         *
         * @param string $password of user
         * 
         * @return array salt and password after encrypt
         */ 
        public static function encryptPassWord($password) {
            $salt = round(microtime(true) * 1000);
            $response =[];
            $response['salt'] = $salt;
            $response['password'] = hash_hmac('sha256', $salt , $password);
            return $response;
        }

        /**
         * Check the exist of username whenever have registration
         *
         * @param string $username
         * 
         * @return boolean true = exist
         */ 
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

        /**
         * Check the exist of username whenever have registration
         *
         * @param string $username
         * 
         * @return boolean true = exist
         */
        public static function getInfo($username) {
            $result = $GLOBALS['db_conn']->queryData(
                "SELECT id, user_type FROM UserInfo WHERE UserInfo.username='" .$username ."'"
            );
            $user = $GLOBALS['db_conn']->convertToArray($result)[0];
            $user_type = $user['user_type'];
            $user_id = $user['id'];

            $result = $GLOBALS['db_conn']->queryData(
                "SELECT first_name, last_name, phone_number FROM $user_type WHERE $user_type.id='$user_id'"
            );
            $user_info = $GLOBALS['db_conn']->convertToArray($result)[0];

            $response = [];
            $response['user_id'] = $user_id;
            $response['user_type'] = $user_type;
            $response['info'] = $user_info;
            return $response;
        }

        /**
         * register for new user
         *
         * @param array $input_array data of new user
         * 
         * @return boolean true = exist
         * @return array id of new user
         */
        public static function register($input_array) {
            $encrypt = User::encryptPassWord($input_array['password']);
            $input_array['password'] = $encrypt['password'];
            $input_array['salt'] = $encrypt['salt'];

            $columns=array_keys($input_array);
            $values=array_values($input_array);
            
            $result = $GLOBALS['db_conn']->queryData(
                "INSERT INTO `UserInfo` (" ."`" .implode("`, `",$columns) ."`" .") 
                VALUES ('" . implode("', '", $values) . "' )"
            );
            if ($result) return User::getId($input_array['username']);
            return false;
        }

        /**
         * authorize
         *
         * @param string $username name of user
         * @param string $password password of user
         * 
         * @return boolean status of authorization
         */
        public static function authorize($username, $password) {
            $salt = User::getSalt($username);
            $hashed_password = User::getPassword($username);

            $hashed_input_password = hash_hmac('sha256', $salt , $password);

            return hash_equals($hashed_password , $hashed_input_password);
        }

        /**
         * update new password
         *
         * @param string $username name of user
         * @param string $password password of user
         * 
         * @return boolean status
         */
        public static function updatePassword($username, $password) {
            $encrypt = User::encryptPassWord($password);
            $password = $encrypt['password'];
            $salt = $encrypt['salt'];
            $result = $GLOBALS['db_conn']->queryData(
                "UPDATE UserInfo
                SET password='$password', salt='$salt'"
                ." WHERE username='$username'"
            );
            if (!$result) return false;
            return true;
        }
    }

?>