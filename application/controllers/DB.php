<?php

    class MyDatabase{
        // private $ini ='../../secret/config.ini';
        private $db_conn;

        function __construct(){
            $db_config = include('config.php');
            $this->db_conn = new mysqli($db_config['servername'], $db_config['username'], $db_config['pass'], $db_config['db']);
        }

        function queryData($sql){
            if (!empty($sql)){
                $result = $this->db_conn->query($sql);
                return $result;
            }else{
                return false;
            }
        }

        function __destruct(){
            $this->db_conn->close();
        }
    }

    $db_conn = new MyDatabase();
?>