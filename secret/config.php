<?php
    class Config {

        static function get() {
            return require "configConstant.php";;
        }

        static function getDbConfig() {
            return Config::get()['configDB'];
        }

        static function getPermission() {
            return Config::get()['pagePermission'];
        }
    }

?>