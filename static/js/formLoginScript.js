/*decorate the header tab; begin*/
function tabHeader1() {
    document.getElementById("tabH2").classList.remove("active");
    document.getElementById("tabH3").classList.remove("active");
    document.getElementById("tabH1").classList.add("active");
    document.getElementById("formParentAndTutor").classList.add("active");
    document.getElementById("formAdmin").classList.remove("active");
}

function tabHeader2() {
    document.getElementById("tabH1").classList.remove("active");
    document.getElementById("tabH3").classList.remove("active");
    document.getElementById("tabH2").classList.add("active");
    document.getElementById("formParentAndTutor").classList.add("active");
    document.getElementById("formAdmin").classList.remove("active");
}

function tabHeader3() {
    document.getElementById("tabH1").classList.remove("active");
    document.getElementById("tabH2").classList.remove("active");
    document.getElementById("tabH3").classList.add("active");
    document.getElementById("formParentAndTutor").classList.remove("active");
    document.getElementById("formAdmin").classList.add("active");
}
/*decorate the header tab; end*/

/*check login JavaScript; begin*/
function isInputInvalid() {
    var testUsername = /^[A-za-z0-9]{4,}$/.test(document.getElementById("loginFormUserName").value);
    var testPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("loginFormPass").value);
    if (testUsername) {
        document.getElementById("checkUserNameP").innerHTML = "";
    } else {
        document.getElementById("checkUserNameP").innerHTML = "Invalid Username";
    }

    if (testPassword) {
        document.getElementById("checkPassP").innerHTML = "";
    } else {
        document.getElementById("checkPassP").innerHTML = "Invalid Password";
    }

    if (testPassword && testUsername)
        document.getElementById("loginButton").disabled = false;
    else
        document.getElementById("loginButton").disabled = true;
}
/*check login JavaScript; end*/

$('#loginButton').click(function() {

    var loginData = {};
    loginData['username'] = document.getElementById("loginFormUserName").value;
    loginData['password'] = document.getElementById("loginFormPass").value;
    loginData['rememberMe'] = $('#rememberMe').is(':checked') ? 'true' : 'false';

    $.ajax({
        type: "POST",
        url: "application/controllers/formLogin.php",
        data: { loginData: loginData },
        success: function(data) {
            if (data == 'success') {
                window.location.replace(window.location.origin + "/" + window.location.pathname.split('/')[1] + "/bodyBanner");
            } else {
                alert('Wrong password! please input again!');
                console.log(loginData);
            }
        }
    });

})