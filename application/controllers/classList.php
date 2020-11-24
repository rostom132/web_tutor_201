<?php
include_once '../models/class.php';
include_once "./common/getAvatar.php";
include_once "../models/subject.php";
function getAllAvatar($class_arr) {
    $arr = array();
    foreach($class_arr as $user) {
        array_push($arr, getUserAvatar($user['user_id']));
    }
    return $arr;
}

function getAllWeakness($class_arr) {
    $arr = array();
    foreach($class_arr as $user) {
        array_push($arr, )
    }
}

function getAllClass($current_page) {

    $total_records = Classs::getNumberOfClass();
    $limit = 1;
    $total_page = ceil($total_records / $limit);
    $start = ($current_page - 1) * $limit;
    $class_arr = Classs::getLimitClasses($current_page, $limit);
    if(sizeof($class_arr[0]) > 0) {
        $avatar_arr = getAllAvatar($class_arr);
        $data = array();
        array_push($data, $total_records);
        array_push($data, $total_page);
        array_push($data, $class_arr);
        array_push($data, $avatar_arr);
        echo(json_encode($data));
    }
    else {
        echo("0");
    }
}

function getWeaknesses() {
    $weakness_list = Subject::getAll();
    echo(json_encode($weakness_list));
}
function getClassWithFilter($filterVal) {

    $filterArr = (array)$filterVal;
    foreach ($filterArr as $key=>$value) {
        if ($filterArr[$key] == "-1") {
            unset($filterArr[$key]);
        }
    }
    $total_records = Classs::getNumberOfClassFilter($filterArr);
    $limit = 2;
    $total_page = ceil($total_records / $limit);
    $start = (1 - 1) * $limit;
    $class_arr = Classs::getLimitClassesFilter($filterArr, 1, $limit);
    if(sizeof($class_arr[0]) > 0) { 
        $avatar_arr = getAllAvatar($class_arr);
        $data = array();
        array_push($data, $total_records);
        array_push($data, $total_page);
        array_push($data, $class_arr);
        array_push($data, $avatar_arr);
        echo(json_encode($data));
    }
    else {
        echo("0");
    }
}
function getCurrentPage () {
    return $this->current_page;
}

if(isset($_POST['filter'])) {
    getClassWithFilter(json_decode($_POST['filterVal']));
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
if(isset($_POST['weakness'])) {
    if($_POST['weakness'] == 1) {
        getWeaknesses();
    }
}
?>