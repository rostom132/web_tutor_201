<?php
include_once 'DB.php';
// class ClassInfo {
//     function getAllClass($current_page) {

//         $sql = "select count(id) as total from class";
//         $result = $GLOBALS['db_conn']->queryData($sql);
//         $row = $result->fetch_assoc();
//         $total_records = $row['total'];
//         $limit = 1;
//         $total_page = ceil($total_records / $limit);
//         $GLOBALS['current_page'] = $current_page;
//         $start = ($current_page - 1) * $limit;

//         $sql = "select * from class LIMIT $start, $limit";
//         // $sql = "select * from class";
//         $result = $GLOBALS['db_conn']->queryData($sql);
//         if($result->num_rows > 0) {
//             $data = array();
//             array_push($data, $total_records);
//             array_push($data, $total_page);
//             while($row = $result->fetch_assoc()) {
//                 $class_info = array(
//                     $row['district'],
//                     $row['phone_number'],
//                     $row['no_students'],
//                     $row['gender_of_tutor'],
//                     $row['salary'],
//                     $row['description'],
//                 );
//                 array_push($data, $class_info);
//             }
//         }
//         echo(json_encode($data));
//     }
//     function getClassWithFilter() {

//     }
//     function getCurrentPage () {
//         return $this->current_page;
//     }
// }

function getAllClass($current_page) {

    $sql = "select count(id) as total from class";
    $result = $GLOBALS['db_conn']->queryData($sql);
    $row = $result->fetch_assoc();
    $total_records = $row['total'];
    $limit = 2;
    $total_page = ceil($total_records / $limit);
    $GLOBALS['current_page'] = $current_page;
    $start = ($current_page - 1) * $limit;
    $sql = "select * from class LIMIT $start, $limit";
    $result = $GLOBALS['db_conn']->queryData($sql);
    if($result->num_rows > 0) {
        $data = array();
        array_push($data, $total_records);
        array_push($data, $total_page);
        while($row = $result->fetch_assoc()) {
            $class_info = array(
                $row['district'],
                $row['phone_number'],
                $row['no_students'],
                $row['gender_of_tutor'],
                $row['salary'],
                $row['description'],
            );
            array_push($data, $class_info);
        }
    }
    echo(json_encode($data));
}
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