//Custom function
function passDataIntoFormDB() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoParent.php?get_data_db=true";
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var obj = JSON.parse(this.responseText)['parent'];
            for (var key in obj) {
                localStorage.setItem(key, obj[key]);
                if (document.getElementById("edit_" + key)) {
                    document.getElementById("edit_" + key).value = obj[key];
                }
            }

            var genderValue = obj['gender'];
            var gender = document.getElementsByName("gender");
            if (genderValue == "M") {
                gender[0].checked = true;
            } else if (genderValue == "F") {
                gender[1].checked = true;
            }

            if (JSON.parse(this.responseText)['avatar_user'] != '')
                $("#avatar_user")
                    .attr("src", JSON.parse(this.responseText)['avatar_user']+"?" + new Date().getTime())
                    .width(200)
                    .height('auto');
            
            localStorage.setItem("avatar", document.getElementById("avatar_user").src);

            document.getElementById("parent_username").innerText = JSON.parse(this.responseText)['username'];
        }
    };
    ajax.send();
    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].disabled = true;
    }
    document.querySelector("#edit_gender_male").disabled = true;
    document.querySelector("#edit_gender_female").disabled = true;
}

function getAllDataInForm() {

    var allInputData = {};
    allInputData['parent'] = {};
    allInputData['password'] = document.getElementById("edit_main_pass").value;

    allInputData['parent']['first_name'] = document.getElementById("edit_fname").value;
    allInputData['parent']['last_name'] = document.getElementById("edit_lname").value;
    allInputData['parent']['email'] = document.getElementById("edit_check_email").value;
    allInputData['parent']['phone_number'] = document.getElementById("edit_phone_number").value;
    var gender = document.getElementsByName("gender");
    var genderResult;
    if (gender[0].checked)
        genderResult = 'M';
    else
        genderResult = 'F';
    allInputData['parent']['gender'] = genderResult;
    allInputData['parent']['date_of_birth'] = document.getElementById("edit_birth").value;

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

    var genderValue = localStorage.getItem("gender");
    var gender = document.getElementsByName("gender");
    if (genderValue == "M") {
        gender[0].checked = true;
    } else {
        gender[1].checked = true;
    }

    for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
        document.getElementsByClassName("form-control")[i].disabled = true;
    }
    document.querySelector("#edit_gender_male").disabled = true;
    document.querySelector("#edit_gender_female").disabled = true;

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
});

//Update Button
$(".btnUpdate").click(function updateData() {
    var allInputData = getAllDataInForm();
    var update_info = false;
    $.ajax({
        type: "POST",
        url: "application/controllers/infoParent.php",
        data: { changeData: allInputData },
        success: function(data) {
            if (data == 'true') {  
                update_info = true;
            } else if (data == 'false'){
                alert('Fail to update infomation!');
            } else if(data == 'WRONG ELEMNT!') {
                alert ('WRONG ELEMENT!');
                update_info = false;
            } else {
                var errors = new Array();
                errors = JSON.parse(data);
                alert('Please update again ' + errors.join(", ") + "!!");
                update_info = false;
            }
        },
        async: false,
        timeout: 3000
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
                    update_avatar = true;
                } else {
                    alert('Fail to upload tutor avatar!!');
                    update_avatar = false;
                }
            },
            error: function(response) {
                alert('Fail to upload tutor avatar!!');
                update_avatar = false;
            },
            async: false,
            timeout: 3000
        });
    }

    if (update_avatar || update_info) {
        alert("Update infomation successful!");
        document.querySelector(".btnChange").removeAttribute("style");
        document.querySelector(".btnCancel").style.display = "none";
        document.querySelector(".btnUpdate").style.display = "none";
        document.querySelector(".btnUpload").style.display = "none";
        passDataIntoFormDB();
    }
});

//Cancel Button
$(".btnCancel").click(function cancleUpdateData() {
    document.querySelector(".btnChange").removeAttribute("style");
    document.querySelector(".btnCancel").style.display = "none";
    document.querySelector(".btnUpdate").style.display = "none";
    document.querySelector(".btnUpload").style.display = "none";

    passDataIntoFormStorage();
});




$(document).ready(function() {
    passDataIntoFormDB();
});