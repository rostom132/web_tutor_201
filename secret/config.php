<?php
    class Config {

        static function get() {
            return require "appSetting.php";
        }

        static function getConfig() {
            return require "appConfig.php";
        }

        static function getDbConfig() {
            return Config::getConfig()['configDB'];
        }

        static function getPermission() {
            return Config::get()['pagePermission'];
        }
        
        static function getMailConfig() {
            return Config::getConfig()['configMail'];
        }

        static function getMailContent() {
            return Config::get()['mailContent'];
        }

    }

?>