<?php
    session_start();
    include_once "../../secret/config.php";
    include_once "../models/parent.php";
    include_once "../models/users.php";
    
    /**
     * get info of parent
     *
     * @param string $password pass of user
     * 
     * @return string status of authorization
     */ 
    function getParentInfo(){
        if (count(glob(Config::get()['avatar']['avatars_dir'] .$_SESSION['user_id'].".*")) > 0){
            $dir = explode('/',glob(Config::get()['avatar']['avatars_dir'] .$_SESSION['user_id'].".*")[0]);
            $name_of_avatar = end($dir);
            $avatar_dir = Config::get()['avatar']['avatars_dir_frontend'] .$name_of_avatar;
        } else {
            $avatar_dir = '';
        }
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
        $result_parent = Parents::updateParent($_SESSION['user_id'], $input_data['parent']);
        $result_pass = true;
        if (!empty($input_data['password'])) {
            $result_pass = User::updatePassword($_SESSION['username'],$input_data['password'] );
        }
        echo (($result_parent&&$result_pass) ? 'true' : 'false');
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