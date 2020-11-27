<?php
    session_start();
    include_once "../models/class.php";
    include_once "../models/tutor.php";
    include_once "../models/class.php";
    include_once "../models/admin.php";
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
        $response['class']['available_time'] = Classs::getAvailableTime($id)['time'];
        $response['user'] = isset($_SESSION['user_type']) ? $_SESSION['user_type']:"";
        
        return json_encode($response);
    }

    function buildClassDataEmail($class_id) {
        $info_class = Classs::getDetaiClassInfo($class_id);
        $info_class['ward'] = Convert::getWard($info_class['district'], $info_class['ward']);
        $info_class['district'] = Convert::getDisctrict($info_class['district']);
        $info_class['gender_of_tutor'] = $info_class['gender_of_tutor'] == 'M' ? 'male' : 'female';
        $info_class['weaknesses'] = Classs::getWeakness($class_id);
        $info_class['available_time'] = Classs::getAvailableTime($class_id)['time'];
        return $info_class;
    }

    function buildTutorDataEmail($tutor_id) {
        $info_tutor = Tutor::getInfo($tutor_id);
        $info_tutor['gender'] = $info_tutor['gender'] == 'M' ? 'male' : 'female';
        $info_tutor['specialize'] = Tutor::getSpecializeGroupConcat($tutor_id)['subject'];
        error_log($info_tutor['specialize'], 3, '../my_errors.log');
        return $info_tutor;
    }  

    function getAdminEmail() {
        return array_column(Admin::getAllEmails(),'email');
    }

    function registerClass($class_id){
        return Email::sendRegisterClassMail(buildClassDataEmail($class_id),buildTutorDataEmail($_SESSION['user_id']),getAdminEmail ());
    }

    if(isset($_GET['classInfoId'])) {
        echo(getClassInfo($_GET['classInfoId']));
    }

    if(isset($_GET['registerClass']) && $_SESSION['user_type'] == 'tutor') {
        echo(registerClass($_GET['registerClass']));
    }
?>