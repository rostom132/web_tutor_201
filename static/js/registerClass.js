import { cityData } from "./constant/city.js";
import { DateSchedule, TimeSchedule } from "./constant/schedule.js";
import { translate } from "./translate.js";
import { arrLang } from "./constant/language.js";

let schedule_id = 1;
let editMode = 0;
let TimeSchedule_Keys = [];
let TimeSchedule_StartTime_Keys = [];
let TimeSchedule_StartTime_Values = [];
let TimeSchedule_Values = [];

$("#schedule_add_btn").click(function() {
    var $schedule_container = $("#schedule_container");
    $schedule_container.append(`
    <div id="schedule_row_` + schedule_id + `"` + `class="row schedule_row">
        <div class="col-3">
            <select disabled id="date_` + schedule_id + `"` + ` class="form__select date_select" required>
                <option class="lang date_option" key="REGISTER.DATE_PLACEHOLDER" value=""></option>
            </select>
        </div>
        <div class="col-3">
            <select disabled id="start_` + schedule_id + `"` + ` class="form__select start_time_select" required>
                <option class="lang start_time_option" key="REGISTER.START_TIME_PLACEHOLDER" value=""></option>
            </select>
        </div>
        <div class="col-3">
            <select disabled id="end_` + schedule_id + `"` + ` class="form__select end_time_select" required>
                <option class="lang end_time_option" key="REGISTER.END_TIME_PLACEHOLDER" value=""></option>
            </select>
        </div>
        <button id="schedule_delete_icon_` + schedule_id + `"` + `class="schedule_icon delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></button>
        <button id="schedule_edit_icon_` + schedule_id + `"` + ` class="schedule_icon edit_icon"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
    </div>
    `);
    schedule_id += 1;
})

// The node to be monitored
var target = $("#schedule_container")[0];

// Create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var newNodes = mutation.addedNodes; // DOM NodeList
        if (newNodes !== null) { // If there are new nodes added
            var $nodes = $(newNodes); // jQuery set
            $nodes.each(function() {
                var $node = $(this);
                if ($node.hasClass("schedule_row")) {
                    var currentLang = localStorage.getItem("stored_lang");
                    translate(currentLang);
                    var $id = $node.attr("id").split("_")[2];
                    renderDate($id);
                }
            });
        }
    });
});

// Configuration of the observer:
var config = {
    attributes: true,
    childList: true,
    characterData: true
};

$("#schedule_container").on("click", ".delete_icon", function() {
    $(this).parent().remove();
})


function changeFieldState($schedule_row_id, status) {
    $("#date_" + $schedule_row_id).prop("disabled", status);
    $("#start_" + $schedule_row_id).prop("disabled", status);
    $("#end_" + $schedule_row_id).prop("disabled", status);
}

$("#schedule_container").on("click", ".edit_icon", function() {
    var $schedule_row_id = $(this).parent().attr("id").split("_")[2];
    var $add_bnt = $("#schedule_add_btn");
    if (editMode === 0) {
        $add_bnt.prop("disabled", true);
        $add_bnt.addClass("disable");
        changeFieldState($schedule_row_id, false);
        var pos = checkForEndTime();
        renderStartTime($schedule_row_id, pos);
        renderEndTime($schedule_row_id);
        editMode = 1;
    } else {
        $add_bnt.prop("disabled", false);
        $add_bnt.removeClass("disable");
        changeFieldState($schedule_row_id, true);
        editMode = 0;
    }
})

$(".date_select").one("click", function() {
    var stored_lang = localStorage.getItem("stored_lang");
    var $current_el = $(this);
    //$current_el.addClass("clicked");
    $.each(DateSchedule[stored_lang], function(key, value) {
        $current_el.append('<option ' + 'value=' + key + '>' + value + '</option>');
    })
})

function renderDate($id) {
    var currentLang = localStorage.getItem("stored_lang");
    var $date_select = $("#date_" + $id);
    $.each(DateSchedule[currentLang], function(key, value) {
        $date_select.append('<option ' + 'value=' + key + '>' + value + '</option>');
    })
}

function checkForEndTime() {
    let $getTimeEndSelect = $(".end_time_select");
    let max = -1;
    if ($getTimeEndSelect.length > 0) {
        $.each($getTimeEndSelect, function() {
            var $current_el = $(this);
            var $option_value = $current_el.find("option:selected").val();
            if ($option_value !== "") {
                var pos = TimeSchedule_Keys.indexOf($option_value);
                if (pos > max) max = pos;
            }
        })
    };
    return max;
}

function renderAllStartTime(pos) {
    // Trigger when end time change
    var TimeSchedule_Keys_Split = TimeSchedule_Keys.slice(pos + 1, TimeSchedule_Keys.length);
    var TimeSchedule_Values_Split = TimeSchedule_Values.slice(pos + 1, TimeSchedule_Values.length);
    var $start_time_select = $(".start_time_select");
    $.each($start_time_select, function() {
        if ($(this).children().length >= 2) {
            let $current_start_time = $(this);
            let $second_option = $current_start_time.find("option:eq(1)").val();
            var start_time_index = TimeSchedule_Keys.indexOf($second_option);
            if (start_time_index < pos) {
                $current_start_time.empty();
                var current_lang = localStorage.getItem("stored_lang");
                var option_placeholder = arrLang[current_lang]["REGISTER"]["START_TIME_PLACEHOLDER"];
                $current_start_time.append('<option class="lang start_time_option" key="REGISTER.START_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
                $.each(TimeSchedule_Keys_Split, function(index, value) {
                    $current_start_time.append('<option class="start_time_option"' + 'value=' + value + '>' + TimeSchedule_Values_Split[index] + '</option>');
                })
            }
        }
    })
}

function renderStartTime($id, pos) {
    var TimeSchedule_Keys_Split = TimeSchedule_StartTime_Keys.slice(pos + 1, TimeSchedule_StartTime_Keys.length);
    var TimeSchedule_Values_Split = TimeSchedule_StartTime_Values.slice(pos + 1, TimeSchedule_StartTime_Values.length);
    let $start_time_select = $("#start_" + $id);
    $.each(TimeSchedule_Keys_Split, function(index, value) {
        $start_time_select.append('<option class="start_time_option"' + 'value=' + value + '>' + TimeSchedule_Values_Split[index] + '</option>');
    })
}

function renderEndTime($id) {
    $("#start_" + $id).change(function() {
        var $schedule_row_id = $(this).attr("id").split("_");
        var $end_time_select = $("#end_" + $schedule_row_id[1]);
        var start_time_option = $(this).find("option:selected").val();
        var pos = TimeSchedule_Keys.indexOf(start_time_option) + 2;
        var TimeSchedule_Keys_Split = TimeSchedule_Keys.slice(pos, TimeSchedule_Keys.length);
        var TimeSchedule_Values_Split = TimeSchedule_Values.slice(pos, TimeSchedule_Values.length);
        $end_time_select.empty();
        var current_lang = localStorage.getItem("stored_lang");
        var option_placeholder = arrLang[current_lang]["REGISTER"]["END_TIME_PLACEHOLDER"];
        $end_time_select.append('<option class="lang end_time_option" key="REGISTER.END_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
        $.each(TimeSchedule_Keys_Split, function(index, value) {
            $end_time_select.append('<option class="end_time_option"' + 'value=' + value + '>' + TimeSchedule_Values_Split[index] + '</option>');
        })
    })
}

function renderDistrict(districtObj) {
    var $district = $("#district_select");
    $.each(districtObj, function(value) {
        $district.append('<option class="district_option" ' + 'value=' + value.id + '>' + value.name + '</option>');
    });
}

$("#district_select").change(function() {
    let $district_dropdown = $(this);
    let $ward = $("#ward_select");
    let $street = $("#street_select");
    if ($district_dropdown.find("option:selected").val() === "") {
        $(".ward_option").slice(1).remove();
        $(".street_option").slice(1).remove();
    } else {
        var $district_name = $district_dropdown.find("option:selected").text();
        var ward_dropdown = [];
        ward_dropdown = cityData["districts"].filter(function(el) {
            return el.name === $district_name;
        });
        // Filter out Ward
        $(".ward_option").slice(1).remove();
        $.each(ward_dropdown[0].wards, function(value) {
            $ward.append('<option class="ward_option"' + 'value=' + value.id + '>' + value.prefix + " " + value.name + '</option>');
        });
        // // Filter out Street
        $(".street_option").slice(1).remove();
        $.each(ward_dropdown[0].streets, function(value) {
            $street.append('<option class="street_option" ' + 'value=' + value.id + '>' + value.prefix + " " + value.name + '</option>');
        });
    }
})

$(function() {
    renderDistrict(cityData.districts);
    observer.observe(target, config);
    TimeSchedule_Keys = Object.keys(TimeSchedule);
    TimeSchedule_Values = Object.values(TimeSchedule);
    var maximum_start_time = TimeSchedule_Keys.indexOf("20:00:00");
    TimeSchedule_StartTime_Keys = TimeSchedule_Keys.slice(0, maximum_start_time + 1);
    TimeSchedule_StartTime_Values = TimeSchedule_Values.slice(0, maximum_start_time + 1);
})