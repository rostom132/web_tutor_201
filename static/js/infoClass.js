import { cityData } from "./constant/city.js";
import { getText } from "./translate.js";

function getDistrict(info) {
    var districtId = parseInt(info['district']);
    info['city'] = 'Hồ Chí Minh';
    info['district'] = cityData['districts'].find(u => u.id == info['district'])['name'];
    info['ward'] = cityData['districts'][districtId - 1]['wards'].find(u => u.id == info['ward'])['name'];
}

function getClassInfo() {
    const id = window.location.pathname.split('/')[3];
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoClass.php?classInfoId=" + id;
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var info = JSON.parse(this.responseText);
                if (info['class'].length !== 0) {
                    getDistrict(info['class']);
                    for (var key in info['class']) {
                        if (document.getElementById("infoClass_" + key)) {
                            document.getElementById("infoClass_" + key).innerText = info['class'][key];
                        }
                    }
                    if (info['class']['gender_of_tutor'] === 'F') {
                        document.getElementById('infoClass_tutor_gender').innerText = 'Nữ'
                    } else {
                        document.getElementById('infoClass_tutor_gender').innerText = 'Nam'
                    }
                    if (info['class']['publisher_ava'] != '') {
                        $("#infoClass_avatar")
                            .attr("src", info['class']['publisher_ava'] + "?" + new Date().getTime())
                            .width(220)
                            .height('auto');
                    }
                    switch (info['user']) {
                        case "tutor":
                            document.getElementById("register_button").hidden = false;
                            if (info['is_registered'] == 'true') {
                                $("#register_button").prop("disabled", true);
                                $("#register_button").text(getText("INFO_CLASS.REGISTERED"));
                            }
                            break;
                        case "admin":
                            document.getElementById("delete_button").hidden = false;
                            break;
                    }
                }
            } catch (err) {
                alert('The class is not found!');
            }
        }
    };
    ajax.send();
}

$("#register_button").click(function registerClass() {
    $(this).prop("disabled", true);
    alert("Please wait...");
    const id = window.location.pathname.split('/')[3];
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoClass.php?registerClass=" + id;
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            switch (this.responseText) {
                case "success":
                    $("#register_button").text(getText("INFO_CLASS.REGISTERED"));
                    alert('The registeration mail has been send to the center! Please wait for the confirmation!');
                    break;
                case "Can not register this class again!":
                    $("#register_button").text(getText("INFO_CLASS.REGISTERED"));
                    alert(this.responseText);
                    break;
                default:
                    alert(this.responseText);
                    $("#register_button").prop("disabled", false);
            }
        }
    };
    ajax.send();
});

$("#delete_button").click(function registerClass() {
    $(this).prop("disabled", true);
    const id = window.location.pathname.split('/')[3];
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoClass.php?deleteClass=" + id;
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            switch (this.responseText) {
                case "success":
                    break;
                default:
                    $("#delete_button").prop("disabled", false);
            }
        }
    };
    ajax.send();
});

$(document).ready(function ready() {
    getClassInfo();
});