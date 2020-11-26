import { cityData } from "./constant/city.js";

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
                    if (info['user'] == "tutor") {
                        document.getElementById("register_button").hidden = false;
                    }
                }
            } catch (err) {
                alert('This class is not exists!');
            }
        }
    };
    ajax.send();
}

$("#register_button").click(function registerClass() {
    const id = window.location.pathname.split('/')[3];
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/infoClass.php?registerClass=" + id;
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    ajax.send();
});

$(document).ready(function ready() {
    getClassInfo();
});