import { cityData } from "./constant/city.js";
import { TimeSchedule, DateScheduleObj } from "./constant/schedule.js";
import { translate } from "./translate.js";
import { arrLang } from "./constant/language.js";

const inputClassKeys = ["topic", "district", "ward", "address", "phone_number", "no_students", "gender_of_tutor", "salary_per_lesson", "no_lesson_per_week", "time_per_lesson", "description"];
const inputClassScheduleKeys = ["schedule_container"];
const intputSubjectKeys = ["subject"];

const get_subject_url = "application/controllers/registerClass.php?get_subject_db=true";
const get_data_url = "application/controllers/registerClass.php?get_data_db=true";

let schedule_id = 1;
let editMode = 0;
let TimeSchedule_Keys = [];
let TimeSchedule_Values = [];
let TimeSchedule_StartTime_Keys = [];
let TimeSchedule_StartTime_Values = [];
const START_TIME_MAX = "20:00:00";

const SUBMIT_PREFIX = "#registerClass-";
const DATE_PREFIX = "#registerClass-date_";
const START_TIME_PREFIX = "#registerClass-start_";
const END_TIME_PREFIX = "#registerClass-end_";

var magicSelect;

/*
 *** Render input fields
 */

$("#schedule_add_btn").click(function() {
    var $schedule_container = $("#registerClass-schedule_container");
    $schedule_container.append(`
    <div id="schedule_row_` + schedule_id + `"` + `class="row schedule_row">
        <div class="col-3">
            <select disabled id="registerClass-date_` + schedule_id + `"` + ` class="form__select date_select" required>
                <option class="lang date_option" key="REGISTER.DATE_PLACEHOLDER" value=""></option>
            </select>
        </div>
        <div class="col-3">
            <select disabled id="registerClass-start_` + schedule_id + `"` + ` class="form__select start_time_select" required>
                <option class="lang start_time_option" key="REGISTER.START_TIME_PLACEHOLDER" value=""></option>
            </select>
        </div>
        <div class="col-3">
            <select disabled id="registerClass-end_` + schedule_id + `"` + ` class="form__select end_time_select" required>
                <option class="lang end_time_option" key="REGISTER.END_TIME_PLACEHOLDER" value=""></option>
            </select>
        </div>
        <button id="schedule_edit_icon_` + schedule_id + `"` + ` class="schedule_icon edit_icon"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
    </div>
    `);
    schedule_id += 1;
})

// The node to be monitored
var target = $("#registerClass-schedule_container")[0];

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

function checkNotEmpty($id) {
    var $check_date = $(DATE_PREFIX + $id).find("option:selected").val();
    var $check_start_time = $(START_TIME_PREFIX + $id).find("option:selected").val();
    var $check_end_time = $(END_TIME_PREFIX + $id).find("option:selected").val();
    if ($check_date !== "" && $check_start_time !== "" && $check_end_time !== "") {
        return 0;
    } else return -1;
}

function appendDeleteButton($id) {
    $("#schedule_row_" + $id).append(`<button id="schedule_delete_icon_` + $id + `"` + `class="schedule_icon delete_icon"><i class="fa fa-trash" aria-hidden="true"></i></button>`);
}

function removeDeleteButton($id) {
    $("#schedule_row_" + $id).children().last().remove();
}

function appendTickIcon($id) {
    $("#schedule_edit_icon_" + $id).children().removeClass("fa-pencil-square-o");
    $("#schedule_edit_icon_" + $id).children().addClass("fa-check");
}

function removeTickIcon($id) {
    $("#schedule_edit_icon_" + $id).children().removeClass("fa-check");
    $("#schedule_edit_icon_" + $id).children().addClass("fa-pencil-square-o");
}

$("#registerClass-schedule_container").on("click", ".delete_icon", function() {
    var $current_id = $(this).attr("id").split("_")[3];
    console.log($current_id + " " + typeof $current_id);
    var $check_flag = checkNotEmpty($current_id);
    if ($check_flag === 0) {
        var $date_selected = $(DATE_PREFIX + $current_id).find("option:selected").val();
        for (let i = 0; i < DateScheduleObj[$date_selected].TimeSlot.length; i++) {
            if (DateScheduleObj[$date_selected].TimeSlot[i].id === parseInt($current_id)) DateScheduleObj[$date_selected].TimeSlot.splice(i, 1);
        }
        console.log(DateScheduleObj[$date_selected].TimeSlot);
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
    $(DATE_PREFIX + $schedule_row_id).prop("disabled", status);
    $(START_TIME_PREFIX + $schedule_row_id).prop("disabled", status);
    $(END_TIME_PREFIX + $schedule_row_id).prop("disabled", status);
}

function compareFreeTimeSlot(b, a) {
    var first_sum = a.start_index + a.end_index;
    var second_sum = b.start_index + b.end_index;
    if (first_sum < second_sum) return 1;
    if (first_sum > second_sum) return -1;
    return 0;
}

$("#registerClass-schedule_container").on("click", ".edit_icon", function() {
    var $schedule_row_id = $(this).parent().attr("id").split("_")[2];
    var $add_bnt = $("#schedule_add_btn");
    if (editMode === 0) {
        $add_bnt.prop("disabled", true);
        $add_bnt.addClass("disable");
        changeFieldState($schedule_row_id, false);
        var $check_flag = checkNotEmpty($schedule_row_id);
        if ($check_flag === 0) {
            onDateChange($schedule_row_id);
            // get selected options;
            var $start_selected = $(START_TIME_PREFIX + $schedule_row_id).find("option:selected").val();
            var $end_selected = $(END_TIME_PREFIX + $schedule_row_id).find("option:selected").val();
            renderOnEdit($schedule_row_id, $start_selected, $end_selected);
        }
        appendDeleteButton($schedule_row_id);
        appendTickIcon($schedule_row_id);
        editMode = 1;
    } else {
        var $check_flag = checkNotEmpty($schedule_row_id);
        // Require user to choose all fields
        console.log($check_flag);
        if ($check_flag == 0) {
            $add_bnt.prop("disabled", false);
            $add_bnt.removeClass("disable");
            changeFieldState($schedule_row_id, true);
            // Update the TimeSchedule Arr
            var $date_selected = $(DATE_PREFIX + $schedule_row_id).find("option:selected").val();
            // Get start_time_selected;
            var $start_time_selected = $(START_TIME_PREFIX + $schedule_row_id).find("option:selected").val();
            var $start_time_index = TimeSchedule_StartTime_Keys.indexOf($start_time_selected);
            // Get selected end_time
            var $end_time_selected = $(END_TIME_PREFIX + $schedule_row_id).find("option:selected").val();
            var $end_time_index = TimeSchedule_Keys.indexOf($end_time_selected);
            // Check for range to store
            var newObj = {
                "id": parseInt($schedule_row_id),
                "start_index": $start_time_index,
                "end_index": $end_time_index,
                "start_value": $start_time_selected,
                "end_value": $end_time_selected
            }
            for (let i = 0; i < DateScheduleObj[$date_selected].TimeSlot.length; i++) {
                if (DateScheduleObj[$date_selected].TimeSlot[i].id === parseInt($schedule_row_id)) DateScheduleObj[$date_selected].TimeSlot.splice(i, 1);
            }
            DateScheduleObj[$date_selected].TimeSlot.push(newObj);
            DateScheduleObj[$date_selected].TimeSlot = DateScheduleObj[$date_selected].TimeSlot.sort(compareFreeTimeSlot);
            console.log(DateScheduleObj[$date_selected].TimeSlot);
            removeDeleteButton($schedule_row_id);
            removeTickIcon($schedule_row_id);
            editMode = 0;
        }
    }
})

function getStartTimeObj($id, date) {
    var TimeSlot = DateScheduleObj[date].TimeSlot;
    var TimeSlot_length = TimeSlot.length;
    var Extract_Key = [];
    var TimeSlot_FreeObj_Keys = [];
    if (TimeSlot_length >= 1) {
        // extract occupied time slot except for the current id
        $.each(TimeSlot, function() {
            if ($(this)[0].id !== parseInt($id)) {
                Extract_Key.push($(this));
            }
        })

        // get all remaining free time slot
        console.log(Extract_Key);
        if (Extract_Key.length >= 1) {
            let start_ref = 0;
            $.each(Extract_Key, function(index, value) {
                var $start_index = value[0].start_index;
                var $end_index = value[0].end_index;
                if ($start_index - start_ref >= 4) {
                    var free_slot = TimeSchedule_StartTime_Keys.filter(function(el, index) {
                        return index >= start_ref && index <= $start_index;
                    })
                    TimeSlot_FreeObj_Keys.push(free_slot);
                }
                start_ref = $end_index;
            })

            // check for final free space
            if (TimeSchedule_StartTime_Keys.length - 1 - start_ref >= 1) {
                var last_free_slot = TimeSchedule_StartTime_Keys.slice(start_ref, TimeSchedule_StartTime_Keys.length);
                TimeSlot_FreeObj_Keys.push(last_free_slot);
            }
        }
    }
    console.log(TimeSlot_FreeObj_Keys);
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
    var $date_select = $(DATE_PREFIX + $id);
    $.each(arrLang[currentLang].DATE, function(key, value) {
        $date_select.append('<option class="lang" key="DATE.' + key + `"` + 'value=' + key + '>' + value + '</option>');
    })
    onDateChange($id);
}

function onDateChange($id) {
    var $date_select = $(DATE_PREFIX + $id);
    $date_select.change(function() {
        if ($date_select.find("option:selected").val() !== "") reRender($id);
        else {
            renderStartTimePlaceHolder($(START_TIME_PREFIX + $id));
            renderEndTimePlaceholder($(END_TIME_PREFIX + $id));
        }
    })
}

function renderStartTimePlaceHolder($start_time_select) {
    $start_time_select.empty();
    var current_lang = localStorage.getItem("stored_lang");
    var option_placeholder = arrLang[current_lang]["REGISTER"]["START_TIME_PLACEHOLDER"];
    $start_time_select.append('<option class="lang start_time_option" key="REGISTER.START_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
}

function renderEndTimePlaceholder($end_time_select) {
    $end_time_select.empty();
    var current_lang = localStorage.getItem("stored_lang");
    var option_placeholder = arrLang[current_lang]["REGISTER"]["END_TIME_PLACEHOLDER"];
    $end_time_select.append('<option class="lang end_time_option" key="REGISTER.END_TIME_PLACEHOLDER" value="">' + option_placeholder + '</option>');
}

function renderStartTimeDefault($id) {
    let $start_time_select = $(START_TIME_PREFIX + $id);
    renderStartTimePlaceHolder($start_time_select);
    $.each(TimeSchedule_StartTime_Keys, function(index, value) {
        $start_time_select.append('<option class="start_time_option"' + 'value=' + value + '>' + TimeSchedule_StartTime_Values[index] + '</option>');
    })
}

function renderEndTimeDefault($id) {
    let $end_time_select = $(END_TIME_PREFIX + $id);
    let $start_time_option = $(START_TIME_PREFIX + $id).find("option:selected").val();
    let $start_time_index = TimeSchedule_StartTime_Keys.indexOf($start_time_option);
    renderEndTimePlaceholder($end_time_select);
    $.each(TimeSchedule_Keys, function(index, value) {
        if (index - $start_time_index >= 4) {
            $end_time_select.append('<option class="end_time_option"' + 'value=' + value + '>' + TimeSchedule_Values[index] + '</option>');
        }
    })
}

function onEndTimeDefaultChange($id) {
    $(START_TIME_PREFIX + $id).change(function() {
        let $start_time_option = $(START_TIME_PREFIX + $id).find("option:selected").val();
        if ($start_time_option !== "") renderEndTimeDefault($id);
        else renderEndTimePlaceholder($(END_TIME_PREFIX + $id));
    });
}

function renderStartTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values) {
    let $start_time_select = $(START_TIME_PREFIX + $id);
    renderStartTimePlaceHolder($start_time_select);
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
    var $end_time_select = $(END_TIME_PREFIX + $id);
    var $start_time_option = $(START_TIME_PREFIX + $id).find("option:selected").val();
    var $get_free_slot_keys = [];
    var $get_free_slot_values = [];
    var $is_in_this = -1;
    renderEndTimePlaceholder($end_time_select);

    $.each(TimeSlot_FreeObj_Keys, function(index, value) {
        var $current_free_slot = $(this);
        var $check_if_match = -1;
        $.each($current_free_slot, function(index, value) {
            if (value === $start_time_option) {
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
    var $last_key_value = $get_free_slot_keys[$get_free_slot_keys.length - 1];
    if ($last_key_value == START_TIME_MAX) {
        $.each($get_free_slot_values, function(index, value) {
            if (index - $is_in_this >= 4) {
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
}

function onEndTimeChange($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values) {
    $(START_TIME_PREFIX + $id).change(function() {
        var $start_time_option = $(START_TIME_PREFIX + $id).find("option:selected").val();
        if ($start_time_option !== "") renderEndTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
        else renderEndTimePlaceholder($(END_TIME_PREFIX + $id));
    });
}

function reRender($id) {
    var $date_select = $(DATE_PREFIX + $id);
    var $selected_date = $date_select.find("option:selected").val();
    if ($selected_date !== "") {
        var TimeSlot_FreeObj_Keys = getStartTimeObj($id, $selected_date);
        if (TimeSlot_FreeObj_Keys.length >= 1) {
            var TimeSlot_FreeObj_Values = getTimeSlotFreeObjValues(TimeSlot_FreeObj_Keys);
            renderStartTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
            onEndTimeChange($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
        } else {
            renderStartTimeDefault($id);
            onEndTimeDefaultChange($id);
        }
    }
}

function renderOnEdit($id, $start_selected, $end_selected) {
    var $date_select = $(DATE_PREFIX + $id);
    var $selected_date = $date_select.find("option:selected").val();
    var TimeSlot_FreeObj_Keys = getStartTimeObj($id, $selected_date);
    if (TimeSlot_FreeObj_Keys.length >= 1) {
        console.log("renderOnEdit " + 1);
        var TimeSlot_FreeObj_Values = getTimeSlotFreeObjValues(TimeSlot_FreeObj_Keys);
        renderStartTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
        let $new_start = $(START_TIME_PREFIX + $id).find("option[value='" + $start_selected + "']");
        $new_start.prop("selected", true);
        renderEndTime($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
        let $new_end = $(END_TIME_PREFIX + $id).find("option[value='" + $end_selected + "']");
        $new_end.prop("selected", true);
        onEndTimeChange($id, TimeSlot_FreeObj_Keys, TimeSlot_FreeObj_Values);
    } else {
        renderStartTimeDefault($id);
        let $new_start = $(START_TIME_PREFIX + $id).find("option[value='" + $start_selected + "']");
        $new_start.prop("selected", true);
        renderEndTimeDefault($id);
        let $new_end = $(END_TIME_PREFIX + $id).find("option[value='" + $end_selected + "']");
        $new_end.prop("selected", true);
        onEndTimeDefaultChange($id);
    }
}

function renderDistrict(districtObj) {
    var $district = $("#registerClass-district");
    $.each(districtObj, function(index, value) {
        $district.append('<option class="district_option" ' + 'value=' + value.id + '>' + value.name + '</option>');
    });
}

$("#registerClass-district").change(function() {
    let $district_dropdown = $(this);
    let $ward = $("#registerClass-ward");
    let $street = $("#registerClass-street");
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

function renderSubject() {
    var arrSubject = {};
    var arrSubject_Keys = [];
    $.ajax({
        type: "GET",
        url: get_subject_url,
        cache: false,
        success: function(responseText) {
            arrSubject = JSON.parse(responseText).subject;
            arrSubject_Keys = arrSubject.map(a => a.id);
            // Render subject input
            magicSelect = $(SUBMIT_PREFIX + "subject").magicSuggest({
                allowFreeEntries: false,
                allowDuplicates: false,
                maxSelection: 3,
                data: arrSubject,
            });
        }
    });
}

function renderAddress() {
    var $address = $(SUBMIT_PREFIX + "address");
    var $district = $(SUBMIT_PREFIX + "district");
    var $ward = $(SUBMIT_PREFIX + "ward");
    var $street = $(SUBMIT_PREFIX + "street");
    $address.change(function() {
        // Check if user has chosen district, ward, street
        if ($district.val() !== "" || $ward.val() !== "" || $street.val() !== "") {
            $address.val($address.val() + " " + $street.find("option:selected").text() + " " + $ward.find("option:selected").text() + " " + $district.find("option:selected").text() + " " + "TP.HCM");
        }
    })
}

/*
 *** Validation
 */

function checkInputClassInfo() {

}

function checkInputSubjectInfo() {

}

function checkInputClassScheduleInfo() {

}

function checkFormFields() {
    var sum = 0;
    var storedObj = {};
    $.each(inputKeys, function(index, value) {
        var $current_field = $(SUBMIT_PREFIX + value);
        if (value === "schedule_container") {
            // Different check for free time schedule
            sum++;
        } else if ($current_field.val() === "") {
            var $p_field = $current_field.parent().children().first();
            $p_field.append('<span class="error-message lang" key="REGISTER.ERROR"></span>');
            var $current_lang = localStorage.getItem("stored_lang");
            translate($current_lang);
            sum++;
        } else {

        }
    })
    if (sum == inputKeys.length) {
        // Execute ajax call
    }
}


$(function() {
    renderSubject();
    renderDistrict(cityData.districts);
    renderAddress();
    observer.observe(target, config);
    TimeSchedule_Keys = Object.keys(TimeSchedule);
    TimeSchedule_Values = Object.values(TimeSchedule);
    var maximum_start_time = TimeSchedule_Keys.indexOf(START_TIME_MAX);
    TimeSchedule_StartTime_Keys = TimeSchedule_Keys.slice(0, maximum_start_time + 1);
    TimeSchedule_StartTime_Values = TimeSchedule_Values.slice(0, maximum_start_time + 1);
    // Form Observation
    $(SUBMIT_PREFIX + "submit-btn").click(() => checkFormFields());
    $(SUBMIT_PREFIX + "update-btn").click(() => updateData());
})