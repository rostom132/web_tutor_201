import { cityData } from "./constant/city.js";

function getDistrict(cityId, districtId, wardId) {
    var district;
    return (cityData['districts'][wardId - 1]['wards'][wardId - 1]['name'] + "   " + cityData['districts'][wardId - 1]['name']);
}

$(document).ready(function ready() {
    console.log(getDistrict(1, 3, 12));
});