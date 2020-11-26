<?php
    session_start();
    include_once "../models/class.php";
    include_once "../models/tutor.php";
    include_once "../models/class.php";
    include_once "./common/getAvatar.php"; 
    include_once "./common/mailTransform.php";
    include_once "./common/convertData.php";

    function getClassInfo($id){
        $response = array(
            'class' => Classs::getClassInfo($id)
        );
        $response['class']['publisher'] = Classs::getClassOwner($id)['first_name'];
        $response['class']['publisher_ava'] = getUserAvatar(Classs::getClassOwner($id)['id']);
        $response['class']['weakness'] = Classs::getWeakness($id);
        $response['user'] = isset($_SESSION['user_type']) ? $_SESSION['user_type']:"";
        return json_encode($response);
    }

    function buildClassDataEmail($class_id) {
        $info_class = Classs::getDetaiClassInfo($class_id);
        $info_class['ward'] = Convert::getWard($info_class['district'], $info_class['ward']);
        $info_class['district'] = Convert::getWard($info_class['district']);
        $info_class['gender_of_tutor'] = $info_class['gender_of_tutor'] == 'M' ? 'male' : 'female';
        return $info_class;
    }

    function buildTutorDataEmail($tutor_id) {
        $info_tutor = Tutor::getInfo($tutor_id);
        $info_tutor['gender'] = $info_tutor['gender'] == 'M' ? 'male' : 'female';
        return $info_tutor;
    }  

    fucntion getAdminEmail () {
        
    }

    function registerClass($class_id){
        
        return Email::sendRegisterClassMail();
    }

    if(isset($_GET['classInfoId'])) {
        echo(getClassInfo($_GET['classInfoId']));
    }

    if(isset($_GET['registerClass']) && $_SESSION['user_type'] == 'tutor') {
        echo(registerClass($_GET['registerClass']));
    }
?>