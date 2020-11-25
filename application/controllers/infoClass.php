<?php
    session_start();
    include_once "../models/class.php";
    include_once "./common/getAvatar.php"; 
    include_once "./common/mailTransform.php";

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