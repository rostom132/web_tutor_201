<?php
    include_once '../../secret/config.php';

    class MyDatabase {
        private $db_conn;

        /**
         * Innit database connection
         */ 
        function __construct(){
            $this->db_conn = new mysqli(Config::getDbConfig()['servername'], Config::getDbConfig()['username'], Config::getDbConfig()['password'], Config::getDbConfig()['dbname']);
        }

        /**
         * call SQL
         *
         * @param string $sql sql querry
         * 
         * @return result 
         */ 
        function queryData($sql){
            if (!empty($sql)){
                $result = $this->db_conn->query($sql);
                return $result;
            }else{
                return false;
            }
        }

        /**
         * convert outbut of data after query to array
         *
         * @return array 
         */ 
        function convertToArray($result){
            if(mysqli_num_rows($result)) return mysqli_fetch_all($result, 1);
            return [[]];
        }

        /**
         * get the row inserted id from the query
         *
         * @return integer id
         */ 
        function getNewInsertedId() {
            return $this->db_conn->insert_id;
        }

        function __destruct(){
            $this->db_conn->close();
        }
    }

    $db_conn = new MyDatabase();

?>