<?php
    session_start();
    include_once "../controllers/common/validateInfo.php";
    include_once "../models/admin.php";
    include_once "../models/users.php";
    include_once "./common/getAvatar.php";
    
    /**
     * get info of admin
     * 
     * @return string info of admin
     */ 
    function getAdminInfo(){
        $avatar_dir = getUserAvatar($_SESSION['user_id']);
        $response = array(
        'admin' => Admin::getInfo($_SESSION['user_id']),
        'avatar_user' => $avatar_dir,
        'username' => $_SESSION['username']);
        return json_encode($response);
    }

    /**
     * upadte info of admin
     *
     * @param array $input_data all input update data (admin: last_name, first_name, phone_number)
     *                                                (password)
     * 
     * @return string true: update sucess | false: fail when update
     */ 
    function updateInfo($input_data) {
        $valInfo = Validate::validateInfo($input_data['admin']);
        if ($valInfo != 'WRONG ELEMENT') {

            if (!Validate::validatePass($input_data['password']) && !empty($input_data['password'])) {
                array_push ($valInfo, 'password');
            }

            if ( sizeof($valInfo) == 0) {
                $result_admin = Admin::updateAdmin($_SESSION['user_id'], $input_data['admin']);
                $result_pass = true;
                if (!empty($input_data['password'])) {
                    $result_pass = User::updatePassword($_SESSION['username'],$input_data['password'] );
                }
                echo (($result_admin&&$result_pass) ? 'true' : 'false');
            } else {
                echo (json_encode($valInfo));
            }
        } else {
            echo 'WRONG ELEMNT!';
        } 
    }

    //Check for get admin request
    if(isset($_GET['get_data_db']) && $_SESSION['user_type'] == 'admin') {
        echo (getAdminInfo());
    }

    //Check for update data request
    if(isset($_POST['changeData']) && $_SESSION['user_type'] == 'admin') {
        updateInfo($_POST['changeData']);
    }

?>