<?php
    include_once "../models/tutor.php";
    include_once "../models/subject.php";

    function getTutorInfo($tutor_id){
        $response = array(
        'tutor' => Tutor::getAllInfo($tutor_id),
        'specialize' => Tutor::getSpecialize($tutor_id),
        'subject' => Subject::getAll());
        echo (json_encode($response));     
    }

    function updateInfo($input_data) {
        $result = Tutor::update($input_data['id'],$input_data['tutor'],$input_data['speciality'],$input_data['password']);
        echo ($result ? 'true' : 'false');
    }
    

    if(isset($_GET['tutor_id'])) {
        getTutorInfo($_GET['tutor_id']);
    }

    if(isset($_POST['changeData'])) {
        updateInfo($_POST['changeData']);
    }
?>