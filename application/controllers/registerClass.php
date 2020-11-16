<?php
	session_start();
	include_once "../controllers/common/validateInfo.php";
	include_once "../models/subject.php";
	include_once "../models/tutor.php";

	function getSubject() {
		$response = array(
			"subject" => Subject::getAll()
		);
		echo json_encode($response);
	}

	function getClassInfo() {

	}

	if(isset($_GET["get_subject_db"]) && $_SESSION["user_type"] == "parent") {
		getSubject();
	}

	if(isset($_GET["get_data_db"]) && $_SESSION["user_type"] == "parent") {
		getClassInfo();
	}
?>