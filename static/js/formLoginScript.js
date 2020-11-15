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
            }
        }
    });

})