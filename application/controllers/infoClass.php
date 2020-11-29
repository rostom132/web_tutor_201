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
        if( isset($_SESSION['user_id']) && $_SESSION['user_type'] == 'tutor') $response['is_registered'] = Tutor::isRegistered($_SESSION['user_id'], $id)? 'true':'false';
        
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
        return $info_tutor;
    }  

    function getAdminEmail() {
        return array_column(Admin::getAllEmails(),'email');
    }

    function deleteClass($class_id) {
        if (Classs::deleteClass($class_id)) return 'success';
        return 'fail';
    }

    function registerClass($class_id){
        if (Tutor::isRegistered($_SESSION['user_id'], $class_id)) return 'Can not register this class again!';
        $result = Email::sendRegisterClassMail(buildClassDataEmail($class_id),buildTutorDataEmail($_SESSION['user_id']),getAdminEmail ());
        if ($result == "success") {
            return Tutor::registerClass($_SESSION['user_id'], $class_id)? 'success' : 'fail';
        }
        return $result;
    }

    if(isset($_GET['classInfoId'])) {
        echo(getClassInfo($_GET['classInfoId']));
    }

    if(isset($_GET['registerClass']) && $_SESSION['user_type'] == 'tutor') {
        echo(registerClass($_GET['registerClass']));
    }

    if(isset($_GET['deleteClass']) && $_SESSION['user_type'] == 'admin') {
        echo(deleteClass($_GET['deleteClass']));
    }
?>