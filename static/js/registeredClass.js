//depencies
import { translate, getText } from "./translate.js";
import * as constants from "./constant/city.js";
// Global var
var user_type;
var class_num;
var page_num;
var class_list;
let current_page = 1;

//Render all class information
function createTemplate(class_list) {
    document.getElementById('show').innerHTML = "";
    var default_avatar = "https://cdn.dribbble.com/users/813156/screenshots/3557331/profile_pic-01.png";
    var infor_icon = "./static/images/icon/information.png";
    var money_icon = "./static/images/icon/moneybag.jpeg";
    var registered_icon = user_type != "tutor" ? "./static/images/icon/tick.png" : "./static/images/icon/student.png";
    for (let i = 0; i < class_list.length; i++) {
        var class_title = class_list[i]['topic'];
        var class_id = class_list[i]['id'];
        var class_description = class_list[i]['description']
        var dist;
        $.each(constants.cityData.districts, function(index, element) {
            if (class_list[i]['district'] == element.id) {
                dist = element.name;
            }
        });
        var salary = class_list[i]['salary_per_lesson'];
        var registered_no = user_type != "tutor" ? "No of tutor: " + class_list[i]['registeredTutors'] : class_list[i]['no_students'];
        var template = document.createElement('div');
        var gender;
        if (class_list[i]['gender_of_tutor'] == 'F') {
            gender = 'CLASSINFO.GENDER_FEMALE';
        } else if (class_list[i]['gender_of_tutor'] == "M") {
            gender = 'CLASSINFO.GENDER_MALE';
        } else {
            gender = 'CLASSINFO.GENDER_BOTH';
        }
        var ava;
        if (class_list[i].ava == "") {
            ava = default_avatar;
        } else ava = class_list[i].ava;
        var weak = class_list[i].weak;
        var date = class_list[i]['post_date'];
        template.setAttribute('class', 'row-wrapper shadow-box');
        template.innerHTML =
            `
        <div class="ribbon">
        <p>${date}</p>
        </div>
        <div class="row">
            <div class="col-sm-2 center-ava">
                        <img src= ${ava} alt="" class="class-avatar">
            </div>
            <div class="col-sm-7">
                <div class="class-info-col">
                    <p>
                        <img src=${infor_icon} style="width: 20px; height: 20px;">
                        <a href="infoClass/${class_id}" target="_blank" id="class-title">${class_title}</a>
                    </p>
                    <p style="height:100px; max-height:100px">
                        ${class_description}
                    </p>
                    <span class="group-span">${weak}</span>
                    <span class="group-span"><span></span> ${dist}</span>
                    <span class="group-span lang" key="${gender}" id="gender_tag">${getText(gender)}</span>
                </div>
            </div>
            <div class="col-sm-3" style="text-align:center">
                <img src=${money_icon} style="width: 30px; height: 30px;">
                <div><span style="font-size:1.5em; color:gold">${String(salary).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</span><span class="lang" key="CLASSINFO.SALARY" id="salary">${getText("CLASSINFO.SALARY")}</span></div>
                <img src=${registered_icon} style="width: 30px; height: 30px; margin-top:20%">
                <p style="font-size:25px; bold ;color:#ff6600">${registered_no}</p>
            </div>
        </div>
        `;
        document.getElementById('show').appendChild(template);
    }

}
//Render pagination part
function pagination(page_num) {
    var page = document.createElement('div');
    page.setAttribute('class', 'pagination');
    page.setAttribute('id', 'pagination');
    document.getElementById('page-wrapper').appendChild(page);
    var num = document.createElement('a');
    num.setAttribute('href', 'registeredClass' + pageButtonURL(parseInt(getURLParam()['page']) - 1));
    num.setAttribute('id', 'prev');
    num.innerHTML = '&laquo;';
    document.getElementById('pagination').appendChild(num);
    for (let i = 0; i < page_num; i++) {
        num = document.createElement('a');
        num.setAttribute('id', i + 1);
        num.setAttribute('href', 'registeredClass' + pageButtonURL(i + 1));
        num.innerHTML = i + 1;
        document.getElementById('pagination').appendChild(num);
    }
    num = document.createElement('a');
    num.setAttribute('href', 'registeredClass' + pageButtonURL(parseInt(getURLParam()['page']) + 1));
    num.setAttribute('id', 'next');
    num.innerHTML = '&raquo;';
    document.getElementById('pagination').appendChild(num);
}

//Run at beginning with jquery
export function initClass() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    current_page = getURLParam()['page'];
    var url = "./application/controllers/registeredClass.php?current=" + current_page;
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loader');
    document.getElementById('show').appendChild(loading);
    ajax.open(method, url, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('show').removeChild(loading);
            var obj = JSON.parse(this.responseText);
            if (obj == "0") {
                noResultTemplate();
                return;
            }
            user_type = obj.user_type;
            class_num = obj[0];
            page_num = obj[1];
            class_list = [];
            for (let i = 0; i < obj[2].length; i++) {
                obj[2][i].ava = obj[3][i];
                obj[2][i].weak = obj[4][i]['name'];
                class_list.push(obj[2][i]);
            }
            createTemplate(class_list);
            pagination(page_num);
            document.getElementById(current_page).setAttribute('class', 'active');
            checkPagingButton();
            var title = user_type == "admin" ? "List of registered classes" : user_type == "tutor" ? "List of sign up classes" :
                "List of posted classes";
            document.getElementById("registeredTitle").innerHTML = title;
        }
    };
}

//Check next, prev disable button
function checkPagingButton() {
    if (current_page == 1) {
        document.getElementById('prev').style.visibility = 'hidden';
        document.getElementById('next').style.visibility = 'visible';
    }
    if (current_page == page_num) {
        document.getElementById('prev').style.visibility = 'visible';
        document.getElementById('next').style.visibility = 'hidden';
    }
    if (current_page != 1 && current_page != page_num) {
        document.getElementById('prev').style.visibility = 'visible';
        document.getElementById('next').style.visibility = 'visible';
    }
    if (page_num == 1) {
        document.getElementById('prev').style.visibility = 'hidden';
        document.getElementById('next').style.visibility = 'hidden';
    }
}
export function getURLParam() {

    let urlString = window.location.href;
    let url = new URL(urlString);
    let page = url.searchParams.get("page");
    let dist = url.searchParams.get("dist");
    let sub = url.searchParams.get("sub");
    let gender = url.searchParams.get("gender");
    return { page, dist, sub, gender };
}

function pageButtonURL(page) {
    let param = getURLParam();
    if (param['gender'] != null || param['dist'] != null || param['sub'] != null) {
        return '?page=' + page + "&dist=" + $("#edit-place").val() + "&sub=" + $("#edit-subject").val() + "&gender=" + $("#edit-gender").val();
    } else return '?page=' + page;
}
export function keepFilterValue() {
    let param = getURLParam();
    if (param['gender'] == null || param['dist'] == null || param['sub'] == null) {
        document.getElementById("edit-place").value = -1;
        document.getElementById("edit-subject").value = -1;
        document.getElementById("edit-gender").value = -1;
    } else {
        document.getElementById("edit-place").value = getURLParam()['dist'];
        document.getElementById("edit-subject").value = getURLParam()['sub'];
        document.getElementById("edit-gender").value = getURLParam()['gender'];
    }

}
export function getClassFiltered(dist, sub, gender) {
    alert(dist + " " + sub + " " + gender);
}

function noResultTemplate() {
    document.getElementById("show").setAttribute('style', 'text-align:center')
    document.getElementById("show").innerHTML = `<img src="./static/images/background/404.png" style="margin-left:auto; margin-right:auto">`;
}

$(function() {
    if (getURLParam()['page'] == null) {
        window.location.replace(window.location.origin + window.location.pathname + '?page=1');
    } else {
        initClass();
    }
})