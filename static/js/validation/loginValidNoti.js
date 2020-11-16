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