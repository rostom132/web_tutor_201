function getAllInfo(role) {
    var allInputData = {};
    if (role == 'parent' || role == 'tutor') {
        allInputData['type'] = role;
        allInputData['token'] = document.getElementById("token").value;
        allInputData['email'] = document.getElementById("email").value;
        allInputData[role] = {};
        allInputData[role]['username'] = document.getElementById("username").value;
        allInputData[role]['password'] = document.getElementById("password").value;
    } else {
        allInputData['type'] = role;
        allInputData['token'] = document.getElementById("token-admin").value;
        allInputData['email'] = document.getElementById("email-admin").value;
        allInputData['code'] = document.getElementById("security-code-admin").value;
        allInputData[role] = {};
        allInputData[role]['username'] = document.getElementById("username-admin").value;
        allInputData[role]['password'] = document.getElementById("password-admin").value;
    }
    return allInputData;
}

function resetAllData() {
    Array.from(document.getElementsByClassName('regFormRowInput')).forEach(function(element) {
        element.value = null;
    });
}

function resetNoti() {
    $("p[id^='check']").each(function() {
        this.innerHTML = "";
    });
    $("button[id^='continue']").each(function() {
        this.disabled = true;
    });
}

/*decorate the header tab; begin*/
$('#tabH1').click(function tabHeader1() {
    if (document.getElementById("tabH1").classList.contains("active")) return;
    document.getElementById("tabH2").classList.remove("active");
    document.getElementById("tabH3").classList.remove("active");
    document.getElementById("tabH1").classList.add("active");
    document.getElementById("formParentAndTutor").classList.add("active");
    document.getElementById("formAdmin").classList.remove("active");
    document.getElementById("email-admin").value = null;
    document.querySelector("#user").style.backgroundColor = "rgba(207, 239, 244, 0.5)";
    document.querySelector("#tabH1").style.backgroundColor = "rgba(207, 239, 244, 0.5)";
    document.querySelector("#tabH2").style.backgroundColor = "#28a6cc";
    document.querySelector("#tabH3").style.backgroundColor = "#28a6cc";
    resetAllData();
    resetNoti();
});

$('#tabH2').click(function tabHeader2() {
    if (document.getElementById("tabH2").classList.contains("active")) return;
    document.getElementById("tabH1").classList.remove("active");
    document.getElementById("tabH3").classList.remove("active");
    document.getElementById("tabH2").classList.add("active");
    document.getElementById("formParentAndTutor").classList.add("active");
    document.getElementById("formAdmin").classList.remove("active");
    document.getElementById("email-admin").value = null;
    document.querySelector("#user").style.backgroundColor = "rgba(141, 213, 232, 0.5)";
    document.querySelector("#tabH1").style.backgroundColor = "#28a6cc";
    document.querySelector("#tabH2").style.backgroundColor = "rgba(141, 213, 232, 0.5)";
    document.querySelector("#tabH3").style.backgroundColor = "#28a6cc";
    resetAllData();
    resetNoti();
});

$('#tabH3').click(function tabHeader3() {
    if (document.getElementById("tabH3").classList.contains("active")) return;
    document.getElementById("tabH1").classList.remove("active");
    document.getElementById("tabH2").classList.remove("active");
    document.getElementById("tabH3").classList.add("active");
    document.getElementById("formParentAndTutor").classList.remove("active");
    document.getElementById("formAdmin").classList.add("active");
    document.querySelector("#admin").style.backgroundColor = "rgba(75, 186, 220, 0.5)";
    document.querySelector("#tabH1").style.backgroundColor = "#28a6cc";
    document.querySelector("#tabH2").style.backgroundColor = "#28a6cc";
    document.querySelector("#tabH3").style.backgroundColor = "rgba(75, 186, 220, 0.5)";
    resetAllData();
    resetNoti();
});
/*decorate the header tab; end*/

$("#continue-admin").click(function continueButton() {
    var infoRegister = getAllInfo('admin');
    var update_info = $.ajax({
        type: "POST",
        url: "application/controllers/formRegister.php",
        data: { registerData: infoRegister },
        success: function(data) {}
    });
});

$("#continue").click(function continueButton() {
    var role;
    if (document.getElementsByClassName("tabButton active")[0].id == "tabH1") role = 'parent';
    else role = 'tutor'

    var infoRegister = getAllInfo(role);
    var update_info = $.ajax({
        type: "POST",
        url: "application/controllers/formRegister.php",
        data: { registerData: infoRegister },
        success: function(data) {
            switch (data) {
                case 'success':
                    alert('Create new account sucessful!!');
                    window.location.replace(window.location.origin + "/" + window.location.pathname.split('/')[1] + "/info" + role.charAt(0).toUpperCase() + role.slice(1));
                    break;

                case 'WRONG ELEMENT':
                    alert(data);
                    break;

                case 'mail':
                    alert('Please check your email and token!');
                    break;

                case 'Username Existed!!':
                    alert(data);
                    break;

                case 'Not send email':
                    alert('Please click the send email button!');
                    break;

                default:
                    var errors = new Array();
                    errors = JSON.parse(data);
                    alert('Please update again ' + errors.join(", ") + "!!");
                    update_info = false;
            }
        }
    });
});

$("#email_admin_button").click(function sendMail() {
    var email = document.getElementById("email-admin").value;
    if (email) {
        $.ajax({
            type: "POST",
            url: "application/controllers/formRegister.php",
            data: { sendToken: email },
            success: function(data) {
                if (data == 'success') {

                } else {

                }
            }
        });
    }
});

$("#email_button").click(function sendMail() {
    var email = document.getElementById("email").value;
    if (email) {
        $.ajax({
            type: "POST",
            url: "application/controllers/formRegister.php",
            data: { sendToken: email },
            success: function(data) {
                if (data == 'success') {

                } else {

                }
            }
        });
    }
});