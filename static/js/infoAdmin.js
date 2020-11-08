var magicSelect;

//Custom function
function passDataIntoFormDB() {
    var mess = localStorage.getItem("user_id");

    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "adminInfo.php?admin_id=1";
    ajax.open(method, url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText)['admin'][0];
            for (var key in obj) {
                localStorage.setItem(key, obj[key]);
                if (document.getElementById("edit_admin_" + key)) {
                    document.getElementById("edit_admin_" + key).value = obj[key];
                }
            }

            var languageValue = obj['language'];
            var languaue = document.getElementById("edit_admin_language");
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
        }
    };
}

function getAllDataInForm() {

    var allInputData = {};
    allInputData['id'] = localStorage.getItem('user_id');
    allInputData['admin'] = {};
    allInputData['password'] = document.getElementById("edit_admin_main_pass").value;

    allInputData['admin']['first_name'] = document.getElementById("edit_admin_fname").value;
    allInputData['admin']['last_name'] = document.getElementById("edit_admin_lname").value;
    allInputData['admin']['email'] = document.getElementById("edit_admin_check_email").value;
    allInputData['admin']['phone_number'] = document.getElementById("edit_admin_phone_number").value;
    var gender = (document.getElementById("edit_admin_gender_male").value == 'male') ? 'M' : 'F';
    allInputData['admin']['gender'] = gender;

    return allInputData;
}

function passDataIntoFormStorage() {

    var edit_admin_fnameValue = localStorage.getItem("fname");
    document.getElementById("edit_admin_fname").value = edit_admin_fnameValue;

    var edit_admin_lnameValue = localStorage.getItem("lname");
    document.getElementById("edit_admin_lname").value = edit_admin_lnameValue;

    var emailValue = localStorage.getItem("mailStore");
    document.getElementById("edit_admin_check_email").value = emailValue;

    var phoneValue = localStorage.getItem("phone_number");
    document.getElementById("edit_admin_phone_number").value = phoneValue;

    var genderValue = localStorage.getItem("gender");
    var gender = document.getElementsByName("gender");
    if (genderValue == "M") {
        gender[0].checked = true;
    } else {
        gender[1].checked = true;
    }


    // var imgValue = localStorage.getItem("avatar");
    // $('#image').attr('src', imgValue);
}

//Image Button
$(".uploader").change(function upImg() {
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#image')
                .attr('src', e.target.result)
                // .width(150)
                // .height(200);
        };

        reader.readAsDataURL(this.files[0]);
    }
    this.value = null;
})

//Change Button
$(".btnChange").click(function changeData() {
    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].removeAttribute("disabled");
    }
    document.querySelector(".btnChange").style.display = "none";
    document.querySelector(".btnUpdate").removeAttribute("style");
    document.querySelector(".btnCancel").removeAttribute("style");
    document.querySelector(".btnUpload").removeAttribute("style");
    document.querySelector("#edit_admin_gender_male").removeAttribute("disabled");
    document.querySelector("#edit_admin_gender_female").removeAttribute("disabled");
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
    document.querySelector("#edit_admin_gender_male").disabled = true;
    document.querySelector("#edit_admin_gender_female").disabled = true;

    var allInputData = getAllDataInForm();
    console.log(allInputData);
    $.ajax({
        type: "POST",
        url: "adminInfo.php",
        data: { changeData: allInputData },
        success: function(data) {
            if (data == 'true') {
                location.reload();
            } else {
                passDataIntoFormStorage();
                alert("Error while updating data!!!");
            }
        }
    });
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
    document.querySelector("#edit_admin_gender_male").disabled = true;
    document.querySelector("#edit_admin_gender_female").disabled = true;

    passDataIntoFormStorage();
});



$(document).ready(function() {

    passDataIntoFormDB();

});