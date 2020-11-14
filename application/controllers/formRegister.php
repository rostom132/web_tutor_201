<?php
    session_start();
    include_once "../models/users.php";
    include_once "../models/tutor.php";
    include_once "../models/parent.php";
    include_once "../models/admin.php";
    include_once "./common/mailTransform.php";
    include_once "./common/authentication.php";

    /**
     * Send token to verify email
     *
     * @param string $username name of user
     * 
     * @return string sucess|fail status of sending token
     */ 
    function sendToken($email) {
        $token = rand(1000000,9999999);
        $result = Email::sendConfirm($email, $token)? 'success':'fail';
        if ($result == 'success') {
            $_SESSION['token_register'] = $token;
            $_SESSION['token_email'] = $email;
        }
        return $result;
    }

    /**
     * register
     *
     * @param array input data
     * 
     * @return string status of registeration
     */ 
    function register($input_data) {
        if ($input_data['token'] == $_SESSION['token_register'] && $input_data['email'] == $_SESSION['token_email']) {

            $role = $input_data['type'];
            if (User::isUsernameExist($input_data[$role]['username'])) return 'Username Existed!!';

            $register_info = $input_data[$role];
            unset($register_info['email']);
            $register_info['user_type'] = $role;
            $register_status = User::register($register_info);
            if ($register_status) {
                switch ($role) {
                    case "tutor":
                        if (!Tutor::createInfo($register_status, array('first_name' => $input_data[$role]['username'], 'email' => $input_data['email'])))
                            return 'fail';
                        break;
                    case "parent":
                        if (!Parents::createInfo($register_status, array('first_name' => $input_data[$role]['username'], 'email' => $input_data['email'])))
                            return 'fail';
                        break;
                    case "admin":
                        break;
                }
            };
            Authen::login($input_data[$role]['username']);
            return 'success';
        }
        return 'Please check again your input token and your email!';
    }

    //Check for login request
    if(isset($_POST['sendToken'])) {
        $email = $_POST['sendToken'];
        echo(sendToken($email)); 
    }

    //Check for register data
    if(isset($_POST['registerData'])) {
        $input_data = $_POST['registerData']; 
        echo(register($input_data));
    }
?>