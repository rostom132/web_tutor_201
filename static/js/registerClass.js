import { cityData } from "./constant/district_ward.js";

function renderDistrict(districtObj) {
    var $district = $("#district");
    $district.empty();
    $.each(districtObj, function(index, value) {
        $district.append('<option ' + 'value=' + value.id + '>' + value.name + '</option>')
    });
}

$("#district_select").change(function() {
    var $district_dropdown = $(this);
    var $district_name = $district_dropdown.find("option:selected").text();
    var ward_dropdown = [];
    ward_dropdown = cityData["districts"].filter(function(el) {
        return el.name === $district_name;
    });
    // Filter out Ward
    let $ward = $("#ward");
    $ward.empty();
    $.each(ward_dropdown[0].wards, function(index, value) {
        $ward.append('<option ' + 'value=' + value.id + '>' + value.prefix + " " + value.name + '</option>')
    });
    // // Filter out Street
    let $street = $("#street");
    $street.empty();
    $.each(ward_dropdown[0].streets, function(index, value) {
        $street.append('<option ' + 'value=' + value.id + '>' + value.prefix + " " + value.name + '</option>')
    });
})

$(function() {
    renderDistrict(cityData.districts);
})