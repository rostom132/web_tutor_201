import { cityData } from "./constant/city.js";
import { DateSchedule, TimeSchedule, DateScheduleObj } from "./constant/schedule.js";
import { translate } from "./translate.js";
import { arrLang } from "./constant/language.js";

let schedule_id = 1;
let editMode = 0;
let TimeSchedule_Keys = [];
let TimeSchedule_StartTime_Keys = [];
let TimeSchedule_StartTime_Values = [];
let TimeSchedule_Values = [];
const START_TIME_MAX = "20:00:00";


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
    var $current_id = $(this).attr("id").split("_")[3];
    var $current_date = $("#date_" + $current_id).find("option:selected").val();
    var $current_start_time = $("#start_" + $current_id).find("option:selected").val();
    var $current_end_time = $("#end_" + $current_id).find("option:selected").val();
    if ($current_date !== "" && $current_start_time && $current_end_time) {
        $.each(DateScheduleObj[$current_date].TimeSlot, function(index, value) {
            if (value.id === parseInt($current_id)) DateScheduleObj[$current_date].TimeSlot.splice(index, 1);
        })
        console.log(DateScheduleObj[$current_date].TimeSlot);
    }
    if (editMode === 1) {
        // Reset state
        var $add_bnt = $("#schedule_add_btn");
        $add_bnt.prop("disabled", false);
        $add_bnt.removeClass("disable");
        changeFieldState($current_id, true);
        editMode = 0;
    }
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
        editMode = 1;
    } else {
        $add_bnt.prop("disabled", false);
        $add_bnt.removeClass("disable");
        changeFieldState($schedule_row_id, true);
        // Update the TimeSchedule Arr
        var $date_selected = $("#date_" + $schedule_row_id).find("option:selected").val();
        // Get start_time_selected;
        var $start_time_selected = $("#start_" + $schedule_row_id).find("option:selected").val();
        var $start_time_index = TimeSchedule_StartTime_Keys.indexOf($start_time_selected);
        // Get selected end_time
        var $end_time_selected = $("#end_" + $schedule_row_id).find("option:selected").val();
        var $end_time_index = TimeSchedule_Keys.indexOf($end_time_selected);
        // Check for range to store
        var newObj = {
            "id": parseInt($schedule_row_id),
            "start_index": $start_time_index,
            "end_index": $end_time_index,
        }
        DateScheduleObj[$date_selected]["TimeSlot"].push(newObj);
        console.log(DateScheduleObj[$date_selected]);
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

function getStartTimeObj($id, date) {
    var TimeSlot = DateScheduleObj[date]["TimeSlot"];
    var TimeSlot_length = TimeSlot.length;
    var Extract_Key = [];
    var TimeSlot_FreeObj_Keys = [];
    if (TimeSlot_length >= 1) {
        // extract occupied time slot except for the current id
        $.each(TimeSlot, function() {
            if ($(this).id !== $id) {
                Extract_Key.push($(this));
            }
        })

        // get all remaining free time slot
        console.log(Extract_Key);
        if (Extract_Key.length >= 1) {
            let start_ref = 0;
            $.each(Extract_Key, function(index, value) {
                console.log(value);
                var $start_index = value[0].start_index;
                var $end_index = value[0].end_index
                console.log($start_index + " " + $end_index);
                if ($start_index - start_ref >= 4 && $end_index <= TimeSchedule_StartTime_Keys.length - 1) {
                    console.log("here");
                    var free_slot = TimeSchedule_StartTime_Keys.filter(function(el, index) {
                        return index >= start_ref && index <= $start_index;
                    })
                    TimeSlot_FreeObj_Keys.push(free_slot);
                }
                start_ref = $end_index;
                console.log(start_ref);
            })

            // check for final free space
            if (TimeSchedule_StartTime_Keys.length - 1 - start_ref >= 1) {
                var last_free_slot = TimeSchedule_StartTime_Keys.slice(start_ref, TimeSchedule_StartTime_Keys.length);
                TimeSlot_FreeObj_Keys.push(last_free_slot);
            }
            console.log(TimeSlot_FreeObj_Keys);
        }
    }
    return TimeSlot_FreeObj_Keys;
}

function getTimeSlotFreeObjValues(TimeSlot_FreeObj) {
    var TimeSlot_FreeObj_Values = [];
    $.each(TimeSlot_FreeObj, function() {
        var $current_free_slot = $(this);
        var $get_current_key = [];
        $.each($current_free_slot, function(index, value) {
            var $key_value = TimeSchedule[value];
            $get_current_key.push($key_value);
            // Check if the final part exist
            if (value === START_TIME_MAX) {
                var $end_time_start_index = TimeSchedule_Keys.indexOf(value);
                console.log($end_time_start_index);
                for (let i = $end_time_start_index + 1; i < TimeSchedule_Values.length; i++) {
                    $get_current_key.push(TimeSchedule_Values[i]);
                }
            }
        })
        TimeSlot_FreeObj_Values.push($get_current_key);
    })
    return TimeSlot_FreeObj_Values;
}

function renderDate($id) {
    var currentLang = localStorage.getItem("stored_lang");
    var $date_select = $("#date_" + $id);
    $.each(DateSchedule[currentLang], function(key, value) {
            $date_select.append('<option ' + 'value=' + key + '>' + value + '</option>');
        })
        // Get the current index value of start and time and compare 
    $date_select.change(function() {
        var $selected_date = $date_select.find("option:selected").val();
        var TimeSlot_FreeObj_Keys = getStartTimeObj($id, $selected_date);
        if (TimeSlot_FreeObj_Keys.length >= 1) {
            var TimeSlot_FreeObj_Values = getTimeSlotFreeObjValues(TimeSlot_FreeObj_Keys);
            console.log(TimeSlot_FreeObj_Values);
            renderStartTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
            renderEndTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
        } else {
            renderStartTimeDefault($id);
            renderEndTimeDefault($id);
        }
    })
}

function renderStartTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values) {
    let $start_time_select = $("#start_" + $id);
    $start_time_select.empty();
    var current_lang = localStorage.getItem("stored_lang");
    var option_placeholder = arrLang[current_lang]["REGISTER"]["START_TIME_PLACEHOLDER"];
    $start_time_select.append('<option class="lang start_time_option" key="REGISTER.START_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
    $.each(TimeSlot_FreeObj_Keys, function(index, value) {
        var $current_keys = $(this);
        var $current_values = TimeSlot_FreeObj_Values[index];
        var last = $current_keys.length - 1;
        $.each($current_keys, function(index, value) {
            if (last - index >= 4 || $current_keys[last] === START_TIME_MAX) {
                $start_time_select.append('<option class="start_time_option"' + 'value=' + value + '>' + $current_values[index] + '</option>');
            }
        })

    })
}

function renderEndTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values) {
    $("#start_" + $id).change(function() {
        var $end_time_select = $("#end_" + $id);
        var $start_time_option = $(this).find("option:selected").val();
        var $get_free_slot_keys = [];
        var $get_free_slot_values = [];
        var $is_in_this = -1;
        $.each(TimeSlot_FreeObj_Keys, function(index, value) {
            var $current_free_slot = $(this);
            var $check_if_match = -1;
            $.each($current_free_slot, function(index, value) {
                if (value === $start_time_option) {
                    console.log(value + " " + index);
                    $is_in_this = index;
                    $check_if_match = index;
                }
            })
            if ($check_if_match > -1) {
                $get_free_slot_keys = $current_free_slot;
                $get_free_slot_values = TimeSlot_FreeObj_Values[index];
                $check_if_match = -1;
            }
        });
        $end_time_select.empty();
        var current_lang = localStorage.getItem("stored_lang");
        var option_placeholder = arrLang[current_lang]["REGISTER"]["END_TIME_PLACEHOLDER"];
        $end_time_select.append('<option class="lang end_time_option" key="REGISTER.END_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
        var $last_key_value = $get_free_slot_keys[$get_free_slot_keys.length - 1];
        if ($last_key_value == START_TIME_MAX) {
            console.log($is_in_this);
            $.each($get_free_slot_values, function(index, value) {
                if (index - $is_in_this >= 4) {
                    console.log(index + " " + value);
                    var $value_index = TimeSchedule_Values.indexOf(value);
                    var $get_key = TimeSchedule_Keys[$value_index];
                    $end_time_select.append('<option class="end_time_option"' + 'value=' + $get_key + '>' + value + '</option>');
                }
            })
        } else {
            $.each($get_free_slot_keys, function(index, value) {
                if (index - $is_in_this >= 4) {
                    $end_time_select.append('<option class="end_time_option"' + 'value=' + value + '>' + $get_free_slot_values[index] + '</option>');
                }
            })
        }
    })
}

function renderStartTimeDefault($id) {
    let $start_time_select = $("#start_" + $id);
    $start_time_select.empty();
    var current_lang = localStorage.getItem("stored_lang");
    var option_placeholder = arrLang[current_lang]["REGISTER"]["START_TIME_PLACEHOLDER"];
    $start_time_select.append('<option class="lang start_time_option" key="REGISTER.START_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
    $.each(TimeSchedule_StartTime_Keys, function(index, value) {
        $start_time_select.append('<option class="start_time_option"' + 'value=' + value + '>' + TimeSchedule_StartTime_Values[index] + '</option>');
    })
}


function renderEndTimeDefault($id) {
    $("#start_" + $id).change(function() {
        let $end_time_select = $("#end_" + $id);
        let $start_time_option = $(this).find("option:selected").val();
        let $start_time_index = TimeSchedule_StartTime_Keys.indexOf($start_time_option);
        $end_time_select.empty();
        var current_lang = localStorage.getItem("stored_lang");
        var option_placeholder = arrLang[current_lang]["REGISTER"]["END_TIME_PLACEHOLDER"];
        $end_time_select.append('<option class="lang end_time_option" key="REGISTER.END_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
        $.each(TimeSchedule_Keys, function(index, value) {
            if (index - $start_time_index >= 4) {
                $end_time_select.append('<option class="end_time_option"' + 'value=' + value + '>' + TimeSchedule_Values[index] + '</option>');
            }
        })
    })
}

function renderDistrict(districtObj) {
    var $district = $("#district_select");
    $.each(districtObj, function(index, value) {
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
        $.each(ward_dropdown[0].wards, function(index, value) {
            $ward.append('<option class="ward_option"' + 'value=' + value.id + '>' + value.prefix + " " + value.name + '</option>');
        });
        // // Filter out Street
        $(".street_option").slice(1).remove();
        $.each(ward_dropdown[0].streets, function(index, value) {
            $street.append('<option class="street_option" ' + 'value=' + value.id + '>' + value.prefix + " " + value.name + '</option>');
        });
    }
})

$(function() {
    renderDistrict(cityData.districts);
    observer.observe(target, config);
    TimeSchedule_Keys = Object.keys(TimeSchedule);
    TimeSchedule_Values = Object.values(TimeSchedule);
    var maximum_start_time = TimeSchedule_Keys.indexOf(START_TIME_MAX);
    TimeSchedule_StartTime_Keys = TimeSchedule_Keys.slice(0, maximum_start_time + 1);
    TimeSchedule_StartTime_Values = TimeSchedule_Values.slice(0, maximum_start_time + 1);
})