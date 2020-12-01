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
            } else if (data == 'sai format roi') {
                alert('Username and password must not include special characters!');
            } else {
                alert('Wrong username or password! please input again!');
            }
        }
    });

})

$(document).ready(function clearData() {
    document.getElementById("loginFormPass").value = "";
    document.getElementById("loginFormUserName").value = "";
});