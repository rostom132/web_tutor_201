<?php
    session_start();
    include_once "../models/users.php";
    include_once "../models/tutor.php";
    include_once "../models/parent.php";
    include_once "../models/admin.php";
    include_once "./common/mailTransform.php";
    include_once "./common/authentication.php";
    include_once "./common/validateInfo.php";

    /**
     * Send token to verify email
     *
     * @param string $username name of user
     * 
     * @return string sucess|fail status of sending token
     */ 
    function sendToken($email) {
        $token = str_pad(rand(0, pow(10, 7)-1), 7, '0', STR_PAD_LEFT);
        $result = Email::sendConfirm($email, $token);
        if ($result == 'success') {
            $_SESSION['token_register'] = $token;
            $_SESSION['token_email'] = $email;
            return 'Success sendding mail to ' .$email;
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
        $valInfo = Validate::validateRegiter($input_data);
        if ($valInfo == 'WRONG ELEMENT') return $valInfo;
        if (sizeof($valInfo) > 0) return json_encode($valInfo);

        if (!isset($_SESSION['token_register']) || !isset($_SESSION['token_email'])) {
            return 'Not send email';
        }
        if ($input_data['token'] == $_SESSION['token_register'] && $input_data['email'] == $_SESSION['token_email']) {

            $role = $input_data['type'];
            if (User::isUsernameExist($input_data[$role]['username'])) return 'Username Existed!!';
            
            if ($role == 'admin') {
                if (!Admin::checkAdminCode($input_data['code'])) return 'Wrong Admin security code!';
            }

            $register_info = $input_data[$role];
            unset($register_info['email']);
            $register_info['user_type'] = $role;
            $register_status = User::register($register_info);
            if ($register_status) {
                switch ($role) {
                    case "tutor":
                        Tutor::createInfo($register_status, array('first_name' => $input_data[$role]['username'], 'email' => $input_data['email']));
                        break;
                    case "parent":
                        Parents::createInfo($register_status, array('first_name' => $input_data[$role]['username'], 'email' => $input_data['email']));
                        break;
                    case "admin":
                        Admin::createInfo($register_status, array('first_name' => $input_data[$role]['username'], 'email' => $input_data['email']));
                        break;
                }
            };
            unset($_SESSION['token_register']);
            unset($_SESSION['token_email']);
            Authen::login($input_data[$role]['username']);
            return 'success';
        }
        return 'mail';
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