<?php
    include_once "../../secret/config.php";

    class Convert {
        public static function getDisctrict($district_id) {
            $city_data = Config::get()['convertData']['city.json'];
            $districts = array_column($city_data['districts'], 'name', 'id');
            return isset($districts[(int)$district_id]) ? $districts[(int)$district_id] : "";
        }

        public static function getWard( $district_id, $ward_id) {
            $city_data = Config::get()['convertData']['city.json'];
            $wards_data = array_column($city_data['districts'], 'wards')[(int)$district_id-1];
            
            $result = "";
            array_walk($wards_data, function($item, $key, $info){ 
                if ($item['id'] == $info[0]) $info[1] = $item['prefix']." ".$item['name'];
            }, array($ward_id, &$result));

            return $result;
        }

    }

?>