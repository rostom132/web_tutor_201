<?php
	session_start();
	include_once '../models/class.php';
	include_once "./common/getAvatar.php";
	include_once "../models/subject.php";
	include_once '../../secret/config.php';

	define('LIMIT', Config::get()['numberOfItemsClassList'] );

	function getRegisteredClass($data, $user_type) {
		switch($user_type) {
			case "admin":

				break;
			case "parent": 
				
				break;
			case "tutor":

				break;
		}
	}

	if(isset($_GET["getRegiseredClass"]) && isset($_SESSION["user_type"])) {
		echo(json_encode(getRegisteredClass($_GET["getRegiseredClass"], $_SESSION["user_type"])));
	}
?>