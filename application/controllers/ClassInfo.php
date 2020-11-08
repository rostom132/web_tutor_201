<?php
include_once '../models/class.php';


function getAllClass($current_page) {

    $total_records = Classs::getNumberOfClass();
    $limit = 2;
    $total_page = ceil($total_records / $limit);
    $start = ($current_page - 1) * $limit;
    $class_arr = Classs::getLimitClasses($current_page, $limit);
    if(sizeof($class_arr) > 0) {
        $data = array();
        array_push($data, $total_records);
        array_push($data, $total_page);
        // while($row = $result->fetch_assoc()) {
        //     $class_info = array(
        //         $row['district'],
        //         $row['phone_number'],
        //         $row['no_students'],
        //         $row['gender_of_tutor'],
        //         $row['salary'],
        //         $row['description'],
        //     );
        array_push($data, $class_arr);
    }
    echo(json_encode($data));
}

//getAllClass(1);
function getClassWithFilter() {

}
function getCurrentPage () {
    return $this->current_page;
}

if(isset($_POST['dist'])) {
    if($_POST['dist'] != ""){
        // $class_model->getAllClass();
    }
    else {
        echo"haha";
    }    
}

if(isset($_POST['init'])) {
    if($_POST['init'] == 1){
        getAllClass($_POST['current']);
    }
    elseif ($_POST['init'] == 2) {
        $page = $_POST['current'];
        getAllClass($page);
    }
    elseif ($_POST['init'] == 3) {
        $page = $_POST['current'];
        getAllClass($page);
    }
    else {
        echo"haha";
    }
}
if(isset($_GET['current'])) {
    getAllClass($_GET['current']);
}

?>