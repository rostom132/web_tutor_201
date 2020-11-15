/**
 * Validate the phonenumber when user input data
 */
$(".phone_number_validation").on("input", function insertNumber(evt) {
    let phonePattern = new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    let phoneValue = evt.target.value;
    let ok = phonePattern.test(phoneValue);
    if (phoneValue.length === 0) {
        evt.target.className = 'form-control'
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
        return
    }
    if (!ok) {
        evt.target.className = 'form-control phone_number_validation invalid';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control phone_number_validation';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('.phone_number_validation').after('<div class="error-message">Wrong phone format!</div>');


/**
 * Validate the email address when user input data
 */
$(".email_validation").on("input", function insertEmail(evt) {
    let emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let emailValue = evt.target.value;
    let ok = emailPattern.test(emailValue);
        if (emailValue.length === 0) {
            document.querySelector("#edit_tutor_check_email").className = "form-control email_validation";
            document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
            return
        }
        if (!ok) {
            evt.target.className = "form-control email_validation invalid";
            document.querySelector(".btnUpdate").disabled = true;
            document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
        } else {
            evt.target.className = "form-control email_validation";
            document.querySelector(".btnUpdate").removeAttribute("disabled");
            document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";

        }
})

$('.email_validation').after('<div class="error-message">Please enter email again!</div>');


/**
 * Validate the firstname when user input data
 */
$(".fname_validation").on("input", function insertFname(evt) {
    let edit_fnamePattern = new RegExp(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/);
    let edit_fnameValue = evt.target.value;
    let ok = edit_fnamePattern.test(edit_fnameValue);
    if (edit_fnameValue.length === 0) {
        evt.target.className = 'form-control'
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
        return
    }
    if (!ok) {
        evt.target.className = 'form-control fname_validation invalid';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control fname_validation';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('.fname_validation').after('<div class="error-message">Wrong name format!</div>');


/**
 * Validate the lastname when user input data
 */
$(".lname_validation").on("input", function insertLname(evt) {
    let edit_lnamePattern = new RegExp(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/);
    let edit_lnameValue = evt.target.value;
    let ok = edit_lnamePattern.test(edit_lnameValue);
    if (edit_lnameValue.length === 0) {
        evt.target.className = 'form-control'
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
        return
    }
    if (!ok) {
        evt.target.className = 'form-control lname_validation invalid';
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        evt.target.className = 'form-control lname_validation';
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('.lname_validation').after('<div class="error-message">Wrong name format!</div>');


/**
 * Validate the password when user input data
 */
$(".pass_validation").on("input", function checkPass(evt) {
    let edit_passPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    let mainPass = document.getElementById("edit_main_pass");
    let checkPass = document.getElementById("edit_check_pass");
    let passValidation = edit_passPattern.test(mainPass.value);

    if (checkPass.value != mainPass.value) {
        checkPass.className = 'form-control check_pass pass_validation check_pass_validation invalid';
    } else {
        checkPass.className = 'form-control check_pass pass_validation';
    }

    if (!passValidation) {
        mainPass.className = 'form-control main_pass pass_validation main_pass_validation invalid';
    } else {
        mainPass.className = 'form-control main_pass pass_validation';
    }

    if (checkPass.value != mainPass.value || !passValidation) {
        document.querySelector(".btnUpdate").disabled = true;
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate disableBtn";
    } else {
        document.querySelector(".btnUpdate").removeAttribute("disabled");
        document.querySelector(".btnUpdate").className = "btnRegister btnUpdate";
    }
})

$('.main_pass_validation').after('<div class="error-message">Minimum 8 characters, at least one letter and one number!</div>');

$('.check_pass_validation').after('<div class="error-message">Not same password!</div>');

/**
 * Validate the extention of update files
 */
$.fn.hasExtension = function(exts) {
    return (new RegExp('(' + exts.map(function(x) { return x.replace(/^/g, '\\.'); }).join('|') + ')$')).test($(this).val());
}

$(".uploader").change(function upImg() {
    if (this.files && this.files[0]) {
        
        var extentions = new Array();

        $.ajax({
            type: "POST",
            url: "application/controllers/updateInfo.php",
            async: false,
            data: { getExtentions: 'true' },
            success: function(data) {
                extentions = data;
            },
            dataType: "json",
            timeout: 3000
        });

        if (extentions.length == 0) extentions = ['jpg', 'png', 'jpeg'];

        if ($('.uploader').hasExtension(extentions)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#avatar_user')
                    .attr('src', e.target.result)
                    .width(200)
                    .height('auto');
            };
            reader.readAsDataURL(this.files[0]);
        } else {
            alert("Please upload only " + extentions.join(", "));
        }
    }
})

$(".btnCancel").click(function clearNoti(){
   
});