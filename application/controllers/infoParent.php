<?php
    session_start();
    include_once "../controllers/common/validateInfo.php";
    include_once "../models/parent.php";
    include_once "../models/users.php";
    include_once "./common/getAvatar.php";
    
    /**
     * get info of parent
     *
     * @param string $password pass of user
     * 
     * @return string status of authorization
     */ 
    function getParentInfo(){
        $avatar_dir = getUserAvatar($_SESSION['user_id']);
        $response = array(
        'parent' => Parents::getInfo($_SESSION['user_id']),
        'avatar_user' => $avatar_dir,
        'username' => $_SESSION['username']);
        echo (json_encode($response));
    }

    /**
     * upadte info of parent
     *
     * @param array $input_data all input update data (parent: last_name, first_name, date_of_birth, email, present_job, gender, phone_number)
     *                                                (password)
     * 
     * @return string true: update sucess | false: fail when update
     */ 
    function updateInfo($input_data) {
        $valInfo = Validate::validateInfo($input_data['parent']);
        if ($valInfo != 'WRONG ELEMENT') {

            if (!Validate::validatePass($input_data['password']) && !empty($input_data['password'])) {
                array_push ($valInfo, 'password');
            }

            if ( sizeof($valInfo) == 0) {
                $result_parent = Parents::updateParent($_SESSION['user_id'], $input_data['parent']);
                $result_pass = true;
                if (!empty($input_data['password'])) {
                    $result_pass = User::updatePassword($_SESSION['username'],$input_data['password'] );
                }
                echo (($result_parent&&$result_pass) ? 'true' : 'false');
            } else {
                echo (json_encode($valInfo));
            }
        } else {
            echo 'WRONG ELEMNT!';
        } 
    }

    //Check for get Parent request
    if(isset($_GET['get_data_db']) && $_SESSION['user_type'] == 'parent') {
        getParentInfo();
    }

    //Check for update data request
    if(isset($_POST['changeData']) && $_SESSION['user_type'] == 'parent') {
        updateInfo($_POST['changeData']);
    }

?>