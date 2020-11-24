<?php
	session_start();
	include_once "../controllers/common/validateInfo.php";
	include_once "../models/subject.php";
	include_once "../models/parent.php";
	include_once "../models/registerClass.php";

	function getSubject() {
		$response = array(
			"subject" => Subject::getAll()
		);
		echo json_encode($response);
	}

	function validateClassInfo($input_data, $type) {
		$isClassValid = Validate::validateClassInfo($input_data, $type);
		if ($isClassValid !== 'WRONG ELEMENT') {
			if(sizeof($isClassValid) == 0) {
				return 'SUCCESS';
			}
			else return $isClassValid;
		}
		else return 'WRONG ELEMENT';
	}

	function createClass($input_data) {
		// Validate ClassInfo
		$isInfoValid = validateClassInfo($input_data["registerClass"], "registerClass");
		if($isInfoValid === 'SUCCESS') {
			$parentID = $_SESSION["user_id"];
			// Insert data -> on success get class id
			$result = registerClass::createClass($parentID, $input_data["registerClass"]);
			if($result !== "FAIL") { 	
				//  Validate Weakness
				$isWeaknessValid = validateClassInfo($input_data["registerWeakness"], "registerWeakness");
				if($isWeaknessValid === 'SUCCESS') {
					// Insert data
					$value_arr = array();
					foreach($input_data["registerWeakness"] as $el) {
						array_push($value_arr, $el["subject"]);
					}
					$weakness_status = registerClass::createWeakness($value_arr, $result);
					if($weakness_status) {
						// Validate Time Schedule
						$isScheduleValid = validateClassInfo($input_data["registerSchedule"], "registerSchedule");
						// Insert data
						if($isScheduleValid === 'SUCCESS') {
							$schedule_status = registerClass::createSchedule($input_data["registerSchedule"] ,$result);
							if($schedule_status) echo 'SUCCESS';
							else echo 'FAIL';
							return;
						}
						else {
							if($isScheduleValid === 'WRONG ELEMENT') echo "WRONG ELEMENT SCHEDULE";
							else echo json_encode($isScheduleValid);
							return;
						}
					}
					else echo 'FAIL';
				}
				else {
					if($isWeaknessValid === 'WRONG ELEMENT') echo "WRONG ELEMENT WEAKNESS";
					else echo json_encode($isWeaknessValid);
					return;
				}
			}
			else echo $result;
		}
		else {
			if($isInfoValid === 'WRONG ELEMENT') echo "WRONG ELEMENT INFO";
			else echo json_encode($isInfoValid);
			return;
		}
	}

	if(isset($_GET["get_subject_db"]) && $_SESSION["user_type"] == "parent") {
		getSubject();
	}

	if(isset($_POST["createClass"]) && $_SESSION["user_type"] == "parent") {
		createClass($_POST["createClass"]);
	}
?>