import teaching_language from "./language.js";

var magicSelect;

//Custom function
function passDataIntoFormDB() {
    var mess = localStorage.getItem("user_id");

    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "tutorInfo.php?tutor_id=1";
    ajax.open(method, url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText)['tutor'][0];
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
        }
    };
}

function getAllDataInForm() {

    var allInputData = {};
    allInputData['id'] = localStorage.getItem('user_id');
    allInputData['tutor'] = {};
    allInputData['speciality'] = magicSelect.getValue();
    allInputData['password'] = document.getElementById("edit_tutor_main_pass").value;

    allInputData['tutor']['first_name'] = document.getElementById("edit_tutor_fname").value;
    allInputData['tutor']['last_name'] = document.getElementById("edit_tutor_lname").value;
    allInputData['tutor']['email'] = document.getElementById("edit_tutor_check_email").value;
    allInputData['tutor']['phone_number'] = document.getElementById("edit_tutor_phone_number").value;
    allInputData['tutor']['language'] = document.getElementById("edit_tutor_language").value;
    allInputData['tutor']['present_job'] = document.getElementById("edit_tutor_job").value;
    allInputData['tutor']['description'] = document.getElementById("edit_tutor_description").value;
    var gender = (document.getElementById("edit_tutor_gender_male").value == 'male') ? 'M' : 'F';
    allInputData['tutor']['gender'] = gender;

    return allInputData;
}

function passDataIntoFormStorage() {

    var edit_tutor_fnameValue = localStorage.getItem("fname");
    document.getElementById("edit_tutor_fname").value = edit_tutor_fnameValue;

    var edit_tutor_lnameValue = localStorage.getItem("lname");
    document.getElementById("edit_tutor_lname").value = edit_tutor_lnameValue;

    var emailValue = localStorage.getItem("mailStore");
    document.getElementById("edit_tutor_check_email").value = emailValue;

    var phoneValue = localStorage.getItem("phone_number");
    document.getElementById("edit_tutor_phone_number").value = phoneValue;

    var languageValue = localStorage.getItem("language");
    var languaue = document.getElementById("edit_tutor_language");
    languaue.value = languageValue;

    var jobValue = localStorage.getItem("jobStore");
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
    console.log(allInputData);
    $.ajax({
        type: "POST",
        url: "tutorInfo.php",
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

$("#edit_tutor_phone_number").on("input", function insertNumber(evt) {
    let phonePattern = new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    let phoneValue = evt.target.value;
    let ok = phonePattern.test(phoneValue);
    if (phoneValue.length === 0) {
        evt.target.className = 'form-control'
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
        return
    }
    if (!ok) {
        evt.target.className = 'form-control invalid';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('#edit_tutor_phone_number').after('<div class="error-message">Wrong phone format!</div>');

$("#edit_tutor_check_email").on("keyup", function insertEmail() {
    let timeout = null;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        let emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let emailValue = document.getElementById("edit_tutor_check_email").value;
        let ok = emailPattern.test(emailValue);
        if (emailValue.length === 0) {
            document.querySelector("#edit_tutor_check_email").className = "form-control";
            document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
            return
        }
        if (!ok) {
            document.querySelector("#edit_tutor_check_email").className = "form-control invalid";
            document.querySelector(".btnUpdate").disabled = true;
            document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
        } else {
            document.querySelector("#edit_tutor_check_email").className = "form-control";
            document.querySelector(".btnUpdate").removeAttribute("disabled");
            document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";

        }
    }, 1000);

})
$('#edit_tutor_check_email').after('<div class="error-message">Please enter email again!</div>');

$("#edit_tutor_fname").on("input", function insertFname(evt) {
    let edit_tutor_fnamePattern = new RegExp(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/);
    let edit_tutor_fnameValue = evt.target.value;
    let ok = edit_tutor_fnamePattern.test(edit_tutor_fnameValue);
    if (edit_tutor_fnameValue.length === 0) {
        evt.target.className = 'form-control'
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
        return
    }
    if (!ok) {
        evt.target.className = 'form-control invalid';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('#edit_tutor_fname').after('<div class="error-message">Wrong name format!</div>');

$("#edit_tutor_lname").on("input", function insertLname(evt) {
    let edit_tutor_lnamePattern = new RegExp(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/);
    let edit_tutor_lnameValue = evt.target.value;
    let ok = edit_tutor_lnamePattern.test(edit_tutor_lnameValue);
    if (edit_tutor_lnameValue.length === 0) {
        evt.target.className = 'form-control'
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
        return
    }
    if (!ok) {
        evt.target.className = 'form-control invalid';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('#edit_tutor_lname').after('<div class="error-message">Wrong name format!</div>');

$("#edit_tutor_main_pass").on("input", function checkPass(evt) {
    let checkPassValue = document.getElementById("edit_tutor_check_pass").value;
    let mainPassValue = evt.target.value;
    if (checkPassValue != mainPassValue) {
        evt.target.className = 'form-control';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})
$('#edit_tutor_main_pass').after('<div class="error-message">Not same password!</div>');

$("#edit_tutor_check_pass").on("input", function checkPass(evt) {
    let mainPassValue = document.getElementById("edit_tutor_main_pass").value;
    let checkPassValue = evt.target.value;
    if (mainPassValue.length === 0) {
        evt.target.className = 'form-control invalid'
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
        return
    }
    if (checkPassValue != mainPassValue) {
        evt.target.className = 'form-control invalid';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('#edit_tutor_check_pass').after('<div class="error-message">Not same password!</div>');


// FOR TESTING
var selectLanguage = document.getElementById('edit_tutor_language');

for (let index in teaching_language) {
    selectLanguage.options[selectLanguage.options.length] = new Option(teaching_language[index], teaching_language[index]);
}


$(document).ready(function() {

    passDataIntoFormDB();


    // var img = $('#image').attr('src');
    // localStorage.setItem("imgStore", img != null ? img : ("https://stockdep.net/files/images/8048665.jpg"));

    // var edit_tutor_fname = document.getElementById("edit_tutor_fname").value;
    // localStorage.setItem("edit_tutor_fnameStore", edit_tutor_fname != null ? edit_tutor_fname:"");

    // var edit_tutor_lname = document.getElementById("edit_tutor_lname").value;
    // localStorage.setItem("edit_tutor_lnameStore", edit_tutor_lname != null ? edit_tutor_lname:"");

    // var email = document.getElementById("edit_tutor_check_email").value;
    // if (email != "") {
    //     var emailValue = document.getElementById("edit_tutor_check_email").value;
    //     localStorage.setItem("mailStore", emailValue);
    // } else {
    //     localStorage.setItem("mailStore", "");
    // }

    // var phone = document.getElementById("edit_tutor_phone_number").value;
    // if (phone != null) {
    //     localStorage.setItem("phoneStore", phone);
    // } else {
    //     localStorage.setItem("phoneStore", "");
    // }

    // var language = document.getElementById("edit_tutor_language").value;
    // if (language != null) {
    //     localStorage.setItem("languageStore", language);
    // } else {
    //     localStorage.setItem("languageStore", "");
    // }

    // var job = document.getElementById("edit_tutor_job").value;
    // if (job != null) {
    //     localStorage.setItem("jobStore", job);
    // } else {
    //     localStorage.setItem("jobStore", "");
    // }

    // var speciality = document.getElementById("speciality").value;
    // if (speciality != null) {
    //     localStorage.setItem("specialityStore", speciality);

    // } else {
    //     localStorage.setItem("specialityStore", "");
    // }


    // var description = document.getElementById("edit_tutor_description").value;
    // if (edit_tutor_lname != null) {
    //     localStorage.setItem("descriptionStore", description);
    // } else {
    //     localStorage.setItem("descriptionStore", "");
    // }

    // var gender = document.getElementsByName("gender");
    // for (let i = 0; i < gender.length; i++) {
    //     if (gender[i].checked == true) {
    //         let genderChoose = gender[i].value;
    //         localStorage.setItem("genderStore", genderChoose);
    //     }

    // }
});