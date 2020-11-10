import teaching_language from "./constant/language.js";

var magicSelect;

//Custom function
function passDataIntoFormDB() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoTutor.php?get_data_db=true";
    ajax.open(method, url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText)['tutor'];
            for (var key in obj) {
                localStorage.setItem(key, obj[key]);
                if (document.getElementById("edit_tutor_" + key)) {
                    document.getElementById("edit_tutor_" + key).value = obj[key];
                }
            }

            var languageValue = obj['language'];
            var languaue = document.getElementById("edit_tutor_language");
            languaue.value = languageValue;

            var genderValue = obj['gender'];
            var gender = document.getElementsByName("gender");
            if (genderValue == "M") {
                gender[0].checked = true;
            } else if (genderValue == "F") {
                gender[1].checked = true;
            }

            var obj_specialize = JSON.parse(this.responseText)['specialize'].map(a => a.id);
            localStorage.setItem('speciality', obj_specialize);

            var obj_subject = JSON.parse(this.responseText)['subject'];
            magicSelect = $('#speciality').magicSuggest({
                allowFreeEntries: false,
                allowDuplicates: false,
                maxSelection: 8,
                data: obj_subject,
            });
            magicSelect.setValue(obj_specialize);
            magicSelect.disable();
            if (JSON.parse(this.responseText)['avatar_user'] != '')
                document.getElementById("avatar_user").src = JSON.parse(this.responseText)['avatar_user'];
            localStorage.setItem("avatar", document.getElementById("avatar_user").src);

            document.getElementById("tutor_username").innerText = JSON.parse(this.responseText)['username'];
        }
    };
}

function getAllDataInForm() {

    var allInputData = {};
    allInputData['tutor'] = {};
    allInputData['speciality'] = magicSelect.getValue();
    console.log(allInputData['speciality']);
    allInputData['password'] = document.getElementById("edit_tutor_main_pass").value;

    allInputData['tutor']['first_name'] = document.getElementById("edit_tutor_fname").value;
    allInputData['tutor']['last_name'] = document.getElementById("edit_tutor_lname").value;
    allInputData['tutor']['date_of_birth'] = document.getElementById("edit_tutor_birth").value;
    allInputData['tutor']['email'] = document.getElementById("edit_tutor_check_email").value;
    allInputData['tutor']['phone_number'] = document.getElementById("edit_tutor_phone_number").value;
    allInputData['tutor']['language'] = document.getElementById("edit_tutor_language").value;
    allInputData['tutor']['present_job'] = document.getElementById("edit_tutor_job").value;
    allInputData['tutor']['description'] = document.getElementById("edit_tutor_description").value;
    var gender = document.getElementsByName("gender");
    var genderResult;
    if (gender[0].checked)
        genderResult = 'M';
    else
        genderResult = 'F';
    allInputData['tutor']['gender'] = genderResult;

    console.log(allInputData);
    return allInputData;
}

function passDataIntoFormStorage() {

    var edit_tutor_fnameValue = localStorage.getItem("fname");
    document.getElementById("edit_tutor_fname").value = edit_tutor_fnameValue;

    var edit_tutor_lnameValue = localStorage.getItem("lname");
    document.getElementById("edit_tutor_lname").value = edit_tutor_lnameValue;

    var emailValue = localStorage.getItem("check_email");
    document.getElementById("edit_tutor_check_email").value = emailValue;

    var phoneValue = localStorage.getItem("phone_number");
    document.getElementById("edit_tutor_phone_number").value = phoneValue;

    var phoneValue = localStorage.getItem("birth");
    document.getElementById("edit_tutor_birth").value = phoneValue;

    var languageValue = localStorage.getItem("language");
    var languaue = document.getElementById("edit_tutor_language");
    languaue.value = languageValue;

    var jobValue = localStorage.getItem("job");
    document.getElementById("edit_tutor_job").value = jobValue;

    var descriptionValue = localStorage.getItem("description");
    document.getElementById("edit_tutor_description").value = descriptionValue;

    var genderValue = localStorage.getItem("gender");
    var gender = document.getElementsByName("gender");
    if (genderValue == "M") {
        gender[0].checked = true;
    } else {
        gender[1].checked = true;
    }

    var specialityValue = localStorage.getItem("speciality").split(",");
    magicSelect.clear();
    magicSelect.setValue(specialityValue);
    magicSelect.disable();

    var imgValue = localStorage.getItem("avatar");
    $('#avatar_user').attr('src', imgValue);
}

//Change Button
$(".btnChange").click(function changeData() {
    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].removeAttribute("disabled");
    }
    document.querySelector(".btnChange").style.display = "none";
    document.querySelector(".btnUpdate").removeAttribute("style");
    document.querySelector(".btnCancel").removeAttribute("style");
    document.querySelector(".btnUpload").removeAttribute("style");
    document.querySelector("#edit_tutor_gender_male").removeAttribute("disabled");
    document.querySelector("#edit_tutor_gender_female").removeAttribute("disabled");
    magicSelect.enable();
});

//Update Button
$(".btnUpdate").click(function updateData() {
    document.querySelector(".btnChange").removeAttribute("style");
    document.querySelector(".btnCancel").style.display = "none";
    document.querySelector(".btnUpdate").style.display = "none";
    document.querySelector(".btnUpload").style.display = "none";
    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].disabled = true;
    }
    document.querySelector("#edit_tutor_gender_male").disabled = true;
    document.querySelector("#edit_tutor_gender_female").disabled = true;

    var allInputData = getAllDataInForm();
    var update_info = $.ajax({
        type: "POST",
        url: "application/controllers/infoTutor.php",
        data: { changeData: allInputData },
        success: function(data) {
            if (data == 'true') {
                return true;
            } else {
                alert('Fail to upload tutor infomation!!');
                return false;
            }
        }
    });
    var update_avatar = false;
    if (update_info && document.getElementById("edit_tutor_fileInput").value != '') {
        var fd = new FormData();
        var files = $('.uploader')[0].files[0];
        fd.append('file', files);
        update_avatar = $.ajax({
            url: 'application/controllers/updateInfo.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response != 0) {
                    return true;
                } else {
                    alert('Fail to upload tutor avatar!!');
                    return false;
                }
            },
            error: function(response) {
                alert('Fail to upload tutor avatar!!');
                return false;
            }
        });
    }

    if (update_avatar || update_info) location.reload();
    passDataIntoFormStorage();
    localStorage.setItem("selection", magicSelect.getValue());

});

//Cancel Button
$(".btnCancel").click(function cancleUpdateData() {
    document.querySelector(".btnChange").removeAttribute("style");
    document.querySelector(".btnCancel").style.display = "none";
    document.querySelector(".btnUpdate").style.display = "none";
    document.querySelector(".btnUpload").style.display = "none";

    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].disabled = true;
    }
    document.querySelector("#speciality").disabled = true;
    document.querySelector("#edit_tutor_gender_male").disabled = true;
    document.querySelector("#edit_tutor_gender_female").disabled = true;
    passDataIntoFormStorage();
});

$(document).ready(function() {
    var selectLanguage = document.getElementById('edit_tutor_language');

    for (let index in teaching_language) {
        selectLanguage.options[selectLanguage.options.length] = new Option(teaching_language[index], teaching_language[index]);
    }
    passDataIntoFormDB();
});