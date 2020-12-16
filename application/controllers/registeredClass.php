<?php
	session_start();
	include_once '../models/class.php';
	include_once "./common/getAvatar.php";
	include_once "../models/subject.php";
	include_once '../../secret/config.php';

	define('LIMIT', Config::get()['numberOfItemsClassList'] );
	function getAllAvatar($class_arr) {
		$arr = array();
		foreach($class_arr as $user) {
			array_push($arr, getUserAvatar($user['user_id']));
		}
		return $arr;
	}
	
	function getAllWeaknessOfClass($class_list) {
		$arr = array();
		$arr = Classs::getWeaknessOfClass(array_column($class_list, 'id'));
		return $arr;
	}

	function getAllClass($current_page) {
		$limit = LIMIT;
		switch($_SESSION['user_type']) {
			case "admin":
				$class_arr = Classs::getRegisteredClasses($current_page, $limit);
				$total_records = Classs::getNoRegisteredClasses();
				break;
			case "parent": 
				$class_arr = Classs::getPostedClassesForParent($_SESSION['user_id'], $current_page, $limit);
				$total_records = Classs::getNoPostedClassesForParent($_SESSION['user_id']);
				break;
			case "tutor":
				$class_arr = Classs::getRegisteredClassesForTutor($_SESSION['user_id'], $current_page, $limit);
				$total_records = Classs::getNoRegisteredClassesForTutor($_SESSION['user_id']);
				break;
		}
		$total_page = ceil($total_records / $limit);
		if($total_records > 0 && $class_arr != "0") {
			$avatar_arr = getAllAvatar($class_arr);
			$sub_arr = getAllWeaknessOfClass($class_arr);
			$data = array();
			$data["user_type"] = $_SESSION["user_type"];
			array_push($data, $total_records);
			array_push($data, $total_page);
			array_push($data, $class_arr);
			array_push($data, $avatar_arr);
			array_push($data, $sub_arr);
			echo(json_encode($data));
		}
		else {
			echo("0");
		}
	}

	if(isset($_GET["current"]) && isset($_SESSION['user_type'])) {
		error_log($_GET["current"], 3, "../log.log");
		getAllClass($_GET["current"]);
	}
?>