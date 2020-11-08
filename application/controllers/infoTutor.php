<?php
    session_start();
    include_once "../models/tutor.php";
    include_once "../models/subject.php";

    function getTutorInfo($tutor_id){
        $response = array(
        'tutor' => Tutor::getInfo($tutor_id),
        'specialize' => Tutor::getSpecialize($tutor_id),
        'subject' => Subject::getAll(),
        'avatar_user' => "../../static/images/avatar/" .$tutor_id .".jpg");
        echo (json_encode($response));     
    }

    function updateInfo($input_data) {
        error_log('sadasdas',0,'../my_errors.log');
        $result_tutor = Tutor::updateTutor($_SESSION['user_id'], $input_data['tutor']);
        if (!empty($input_data['speciality'])) $result_speciality = Tutor::updateSpeciality($_SESSION['user_id'], $input_data['speciality']);
        else $result_speciality = Tutor::updateSpeciality($_SESSION['user_id'], []);
        echo (($result_tutor&&$result_speciality) ? 'true' : 'false');
    }

    if(isset($_GET['get_data_db']) && $_SESSION['user_type'] == 'tutor') {
        getTutorInfo($_SESSION['user_id']);
    }

    if(isset($_POST['changeData']) && $_SESSION['user_type'] == 'tutor') {
        updateInfo($_POST['changeData']);
    }

?>