<?php
    session_start();
    include_once "../../secret/config.php";
    include_once "../controllers/common/validateInfo.php";
    include_once "../models/tutor.php";
    include_once "../models/subject.php";
    include_once "../models/users.php";
    
    /**
     * get info of tutor
     * 
     * @return string status of authorization
     */ 
    function getTutorInfo(){
        if (count(glob(Config::get()['avatar']['avatars_dir'] .$_SESSION['user_id'] .".*")) > 0){
            $dir = explode('/',glob(Config::get()['avatar']['avatars_dir'] .$_SESSION['user_id'] .".*")[0]);
            $name_of_avatar = end($dir);
            $avatar_dir = Config::get()['avatar']['avatars_dir_frontend'] .$name_of_avatar;
        } else {
            $avatar_dir = '';
        }
        $response = array(
        'tutor' => Tutor::getInfo($_SESSION['user_id']),
        'specialize' => Tutor::getSpecialize($_SESSION['user_id']),
        'subject' => Subject::getAll(),
        'avatar_user' => $avatar_dir,
        'username' => $_SESSION['username']);
        echo (json_encode($response));
    }

    /**
     * upadte info of tutor
     *
     * @param array $input_data all input update data (tutor: last_name, first_name, date_of_birth, email, present_job, gender, phone_number, description)
     *                                                (password) (speciality: array of speciality id)
     * 
     * @return string true: update sucess | false: fail when update
     */ 
    function updateInfo($input_data) {
        $valInfo = Validate::validateInfo($input_data['tutor']);
        if ($valInfo != 'WRONG ELEMENT') {

            if (!Validate::validatePass($input_data['password']) && !empty($input_data['password'])) {
                array_push ($valInfo, 'password');
            }

            if ( sizeof($valInfo) == 0) {

                $result_tutor = Tutor::updateTutor($_SESSION['user_id'], $input_data['tutor']);
                if (!empty($input_data['speciality'])) $result_speciality = Tutor::updateSpeciality($_SESSION['user_id'], $input_data['speciality']);
                else $result_speciality = Tutor::updateSpeciality($_SESSION['user_id'], []);

                $result_pass = true;
                if (!empty($input_data['password'])) {
                    $result_pass = User::updatePassword($_SESSION['username'],$input_data['password'] );
                }

                echo (($result_tutor&&$result_speciality&&$result_pass) ? 'true' : 'false');
            } else {
                echo (json_encode($valInfo));
            }
        } else {
            echo 'WRONG ELEMNT!';
        }  
    }

    //Check for get Tutor request
    if(isset($_GET['get_data_db']) && $_SESSION['user_type'] == 'tutor') {
        getTutorInfo();
    }

    //Check for update data request
    if(isset($_POST['changeData']) && $_SESSION['user_type'] == 'tutor') {
        updateInfo($_POST['changeData']);
    }

?>