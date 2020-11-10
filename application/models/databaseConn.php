<?php

    class MyDatabase{
        private $ini ='../../secret/config.ini';
        private $db_conn;

        function __construct(){
            $db_config = parse_ini_file($this->ini);
            $this->db_conn = new mysqli('localhost', 'root', 'khoa1234', 'Class');
        }

        function queryData($sql){
            if (!empty($sql)){
                $result = $this->db_conn->query($sql);
                return $result;
            }else{
                return false;
            }
        }
        function convertToArray($result){
            return mysqli_fetch_all($result, 1);
        }
        function __destruct(){
            $this->db_conn->close();
        }
    }

    $db_conn = new MyDatabase();
?>