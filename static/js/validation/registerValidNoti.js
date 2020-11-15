function checkUser() {
    return document.getElementById("tabH3").classList.contains("active") ? '-admin' : '';
}

function disableContinue() {
    var id = 'continue' + checkUser();
    document.getElementById(id).disabled = true;
}

function checkEnable() {
    var enable = false;

    if (checkUser() == '-admin') {
        $("p[id^='check'][id$='-admin']").each(function(index, value) {
            if (this.innerHTML != "") {
                enable = true;
            }
        });
    } else {
        $("p[id^='check']").each(function(index, value) {
            if (this.innerHTML != "") {
                enable = true;
            }
        });
    }

    var fields = ["username", "email", "token", "password", "confirm-password", "security-code"];
    fields.forEach(function myFunction(item) {
        var element = document.getElementById(item + checkUser())
        if (element != null && element.value == "") {
            enable = true;
        }
    });
    document.getElementById('continue' + checkUser()).disabled = enable;
}

$("input[id^='username']").on("input", function validUsername() {
    var id = 'username' + checkUser();
    var test = /^[A-za-z0-9]{4,}$/.test(document.getElementById(id).value);
    if (test) {
        document.getElementById("checkUsername" + checkUser()).innerHTML = "";
        checkEnable();
    } else {
        document.getElementById("checkUsername" + checkUser()).innerHTML = "Invalid Username";
        disableContinue();
    }
});

$("input[id^='email']").on("input", function validEmail() {
    var id = 'email' + checkUser();
    var test = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById(id).value);
    if (test) {
        document.getElementById("checkEmail" + checkUser()).innerHTML = "";
        checkEnable();
    } else {
        document.getElementById("checkEmail" + checkUser()).innerHTML = "Invalid gmail";
        disableContinue();
    }
});

$("input[id^='token']").on("input", function validToken() {
    var id = 'token' + checkUser();
    var test = /^[0-9]{7}$/.test(document.getElementById(id).value);
    if (test) {
        document.getElementById("checkToken" + checkUser()).innerHTML = "";
        checkEnable();
    } else {
        document.getElementById("checkToken" + checkUser()).innerHTML = "Invalid Token";
        disableContinue();
    }
});

$("input[id^='security-code']").on("input", function validCode() {
    var test = /^[0-9]{7}$/.test(document.getElementById('security-code-admin').value);
    if (test) {
        document.getElementById('checkSecurityCode-admin').innerHTML = "";
        checkEnable();
    } else {
        document.getElementById('checkSecurityCode-admin').innerHTML = "Invalid Token";
        disableContinue();
    }
});

$("input[id*='password']").on("input", function validPassword() {
    var id = 'password' + checkUser();
    var password = document.getElementById(id).value;
    var checkPassword = document.getElementById('confirm-' + id).value;
    var test = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if (test) {
        document.getElementById("checkPassword" + checkUser()).innerHTML = "";
        checkEnable();
    } else {
        document.getElementById("checkPassword" + checkUser()).innerHTML = "Minimum 8 characters, at least one letter and one number!";
        disableContinue();
    }

    if (password == checkPassword) {
        document.getElementById("checkConfirmPassword" + checkUser()).innerHTML = "";
        checkEnable();
    } else {
        document.getElementById("checkConfirmPassword" + checkUser()).innerHTML = "Invalid Password";
        disableContinue();
    }
});