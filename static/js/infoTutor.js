import teaching_language from "./constant/language.js";

var magicSelect;

//Custom function
function passDataIntoFormDB() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoTutor.php?get_data_db=true";
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText)['tutor'];
            for (var key in obj) {
                localStorage.setItem(key, obj[key]);
                if (document.getElementById("edit_" + key)) {
                    document.getElementById("edit_" + key).value = obj[key];
                }
            }

            var languageValue = obj['language'];
            var languaue = document.getElementById("edit_language");
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
            if (JSON.parse(this.responseText)['avatar_user'] != ''){
                $("#avatar_user")
                    .attr("src", JSON.parse(this.responseText)['avatar_user']+"?" + new Date().getTime())
                    .width(200)
                    .height('auto');
            }
            localStorage.setItem("avatar", document.getElementById("avatar_user").src);

            document.getElementById("tutor_username").innerText = JSON.parse(this.responseText)['username'];
        }
    };
    ajax.send();
}

function getAllDataInForm() {

    var allInputData = {};
    allInputData['tutor'] = {};
    allInputData['speciality'] = magicSelect.getValue();
    allInputData['password'] = document.getElementById("edit_main_pass").value;

    allInputData['tutor']['first_name'] = document.getElementById("edit_fname").value;
    allInputData['tutor']['last_name'] = document.getElementById("edit_lname").value;
    allInputData['tutor']['date_of_birth'] = document.getElementById("edit_birth").value;
    allInputData['tutor']['email'] = document.getElementById("edit_check_email").value;
    allInputData['tutor']['phone_number'] = document.getElementById("edit_phone_number").value;
    allInputData['tutor']['language'] = document.getElementById("edit_language").value;
    allInputData['tutor']['present_job'] = document.getElementById("edit_job").value;
    allInputData['tutor']['description'] = document.getElementById("edit_description").value;
    var gender = document.getElementsByName("gender");
    var genderResult;
    if (gender[0].checked)
        genderResult = 'M';
    else
        genderResult = 'F';
    allInputData['tutor']['gender'] = genderResult;
    return allInputData;
}

function passDataIntoFormStorage() {

    var edit_fnameValue = localStorage.getItem("fname");
    document.getElementById("edit_fname").value = edit_fnameValue;

    var edit_lnameValue = localStorage.getItem("lname");
    document.getElementById("edit_lname").value = edit_lnameValue;

    var emailValue = localStorage.getItem("check_email");
    document.getElementById("edit_check_email").value = emailValue;

    var phoneValue = localStorage.getItem("phone_number");
    document.getElementById("edit_phone_number").value = phoneValue;

    var phoneValue = localStorage.getItem("birth");
    document.getElementById("edit_birth").value = phoneValue;

    var languageValue = localStorage.getItem("language");
    var languaue = document.getElementById("edit_language");
    languaue.value = languageValue;

    var jobValue = localStorage.getItem("job");
    document.getElementById("edit_job").value = jobValue;

    var descriptionValue = localStorage.getItem("description");
    document.getElementById("edit_description").value = descriptionValue;

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
    document.querySelector("#edit_gender_male").removeAttribute("disabled");
    document.querySelector("#edit_gender_female").removeAttribute("disabled");
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
    document.querySelector("#edit_gender_male").disabled = true;
    document.querySelector("#edit_gender_female").disabled = true;

    var allInputData = getAllDataInForm();
    var update_info = $.ajax({
        type: "POST",
        url: "application/controllers/infoTutor.php",
        data: { changeData: allInputData },
        success: function(data) {
            if (data == 'true') {  
                return true;
            } else if (data == 'false'){
                alert('Fail to update infomation!');
            } else if(data == 'WRONG ELEMNT!') {
                alert ('WRONG ELEMENT!');
                return false;
            } else {
                var errors = new Array();
                errors = JSON.parse(data);
                alert('Please update again ' + errors.join(", ") + "!!");
                return false;
            }
        }
    });

    var update_avatar = false;
    if (update_info && document.getElementById("edit_fileInput").value != '') {
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

    if (update_avatar || update_info) {
        passDataIntoFormDB();
        alert("Update infomation successful!");
    } else {
        passDataIntoFormStorage();
    }
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
    document.querySelector("#edit_gender_male").disabled = true;
    document.querySelector("#edit_gender_female").disabled = true;
    passDataIntoFormStorage();
});

$(document).ready(function() {
    var selectLanguage = document.getElementById('edit_language');

    for (let index in teaching_language) {
        selectLanguage.options[selectLanguage.options.length] = new Option(teaching_language[index], teaching_language[index]);
    }
    passDataIntoFormDB();
});