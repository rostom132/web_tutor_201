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
    resetIntervalId(timerIntervalId);
    emailButton();
    $('#email_button').bind("click", () => sendUserMail());
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
    resetIntervalId(timerIntervalId);
    emailButton();
    $('#email_button').bind("click", () => sendUserMail());
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
    resetIntervalId(timerIntervalId);
    emailButton();
    $('#email_admin_button').bind("click", () => sendAdminMail());
    resetNoti();
});
/*decorate the header tab; end*/

//Countdown button
var timerIntervalId = null;
var time_limit = 10;

function resetIntervalId(timerIntervalId) {
    clearInterval(timerIntervalId);
}

function resetTimer() {
    let timePassed = 0;
    let timeLeft = time_limit;
    let timerInterval = null;
    let remainingPathColor = 'green';
    let template = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${timeLeft}</span>
    </div>
    `;
    if (document.getElementById('formParentAndTutor').classList.contains('active')) {
        document.querySelector("#app-user").innerHTML = template;
    } else {
        document.querySelector("#app-admin").innerHTML = template;
    }
    return [timePassed, time_limit, timeLeft];
}

function startTimer(timePassed, TIME_LIMIT, timeLeft) {

    timerIntervalId = setInterval(() => {
        timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = timeLeft;
        setCircleDasharray(timeLeft, TIME_LIMIT);
        setRemainingPathColor(timeLeft);
        if (timeLeft === 0) {
            resetIntervalId(timerIntervalId);
            emailButton();
            if (document.getElementById('formParentAndTutor').classList.contains('active')) {
                $('#email_button').bind("click", () => sendUserMail());
            } else {
                $('#email_admin_button').bind("click", () => sendUserMail());
            }
        }
    }, 1000);
}

function setRemainingPathColor(timeLeft) {
    const WARNING_THRESHOLD = 6;
    const ALERT_THRESHOLD = 3;
    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction(timeLeft, TIME_LIMIT) {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray(timeLeft, TIME_LIMIT) {
    const circleDasharray = `${(
    calculateTimeFraction(timeLeft, TIME_LIMIT) * 283
  ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

function emailButton() {
    let button_user = `<button id="email_button" style="background-color: transparent;" type="button">
                        <div style="position:absolute;">
                            <span class="tooltiptext">Verify email</span>
                        </div>
                        <i class="rowContact fas fa-user-check"></i>
                        </button>`;
    let button_admin = `<button id="email_admin_button" style="background-color: transparent;" type="button">
                        <div style="position:absolute;">
                            <span class="tooltiptext">Verify email</span>
                        </div>
                        <i class="rowContact fas fa-user-check"></i>
                        </button>`;
    document.querySelector('#app-user').innerHTML = button_user;
    document.querySelector('#app-admin').innerHTML = button_admin;

}

$("button[id^='continue']").click(function continueButton() {
    var role;
    if (document.getElementsByClassName("tabButton active")[0].id == "tabH1") role = 'parent';
    else if (document.getElementsByClassName("tabButton active")[0].id == "tabH2") role = 'tutor';
    else role = 'admin'

    var infoRegister = getAllInfo(role);
    var update_info = $.ajax({
        type: "POST",
        url: "application/controllers/formRegister.php",
        data: { registerData: infoRegister },
        success: function(data) {
            console.log(data);
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
                case 'Wrong Admin security code!':
                    alert(data);
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

function sendAdminMail() {
    var email = document.getElementById("email-admin").value;
    if (email) {
        $.ajax({
            type: "POST",
            url: "application/controllers/formRegister.php",
            data: { sendToken: email },
            success: function(data) {
                alert(data);
            }
        });
    }
    let timeSetting = resetTimer();
    startTimer(timeSetting[0], timeSetting[1], timeSetting[2]);
}

function sendUserMail() {
    var email = document.getElementById("email").value;
    if (email) {
        $.ajax({
            type: "POST",
            url: "application/controllers/formRegister.php",
            data: { sendToken: email },
            success: function(data) {
                alert(data);
            }
        });
    }
    let timeSetting = resetTimer();
    startTimer(timeSetting[0], timeSetting[1], timeSetting[2]);
}

$("#email_admin_button").click(() => sendAdminMail());

$("#email_button").click(() => sendUserMail());