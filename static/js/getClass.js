//depencies
import {translate, getText} from "./translate.js";
import * as constants from "./constant/city.js";
// Global var
var class_num;
var page_num;
var class_list;
let current_page = 1;
//Show number of class found
function renderClassNum(class_num) {
    if(class_num <= 1) {
        document.getElementById('count').innerHTML = class_num;
    }
    else {
        document.getElementById('count').innerHTML = class_num;
    }
}
//Render all class information
function createTemplate(class_list) {
    document.getElementById('show').innerHTML="";
    var default_avatar = "https://d1plicc6iqzi9y.cloudfront.net/sites/default/files/styles/baiviet_50_50/public/AAuE7mBFjncP4O9wWvDXYnppGHsN0WgfIA6rRp0AfKXw%3Ds96-c";
    var infor_icon = "./static/images/icon/information.png";
    var money_icon = "./static/images/icon/moneybag.jpeg";
    var student_icon = "./static/images/icon/student.png";
    for(let i = 0; i < class_list.length; i++)
    {
        var class_title = class_list[i]['topic'];
        var class_description = class_list[i]['description']
        var dist;
        $.each(constants.cityData.districts, function(index, element){
            if(class_list[i]['district'] == element.id) {
                dist = element.name;
            }
        });
        var salary = class_list[i]['salary_per_lesson'];
        var student_no = class_list[i]['no_students'];
        var template = document.createElement('div');
        var gender;
        if(class_list[i]['gender_of_tutor'] == 'F') {
            gender = 'CLASSINFO.GENDER_FEMALE';
        }
        else if(class_list[i]['gender_of_tutor'] == "M") {
            gender = 'CLASSINFO.GENDER_MALE';
        }
        else {
            gender = 'CLASSINFO.GENDER_BOTH';
        }
        var ava = class_list[i].ava;
        template.setAttribute('class', 'row-wrapper shadow-box');
        template.innerHTML = 
        `
        <div class="ribbon">
        <p>ENG</p>
        </div>
        <div class="row">
            <div class="col-sm-2 center-ava">
                        <img src= ${ava} alt="" class="class-avatar">
            </div>
            <div class="col-sm-6">
                <div class="class-info-col">
                    <p>
                        <img src=${infor_icon} style="width: 20px; height: 20px;">
                        <span id="class-title">${class_title}</span>
                    </p>
                    <p>
                        ${class_description}
                    </p>
                    <span class="group-span">Toán(ENG)</span>
                    <span class="group-span"><span></span> ${dist}</span>
                    <span class="group-span lang" key="${gender}" id="gender_tag">${getText(gender)}</span>
                </div>
            </div>
            <div class="col-sm-2" style="text-align:center">
                <img src=${money_icon} style="width: 30px; height: 30px;">
                <div><span style="font-size:1.5em; color:gold">${String(salary).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</span><span class="lang" key="CLASSINFO.SALARY" id="salary">${getText("CLASSINFO.SALARY")}</span></div>
            </div>
            <div class="col-sm-2" style="text-align:center">
                <img src=${student_icon} style="width: 30px; height: 30px;">
                <p style="font-size:25px; bold ;color:#ff6600">${student_no}</p>
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
    num.setAttribute('href', pageButtonURL(parseInt(getURLParam()['page'])-1));
    num.setAttribute('id','prev');
    num.innerHTML='&laquo;';
    document.getElementById('pagination').appendChild(num);
    for(let i = 0; i < page_num; i++) {
        num = document.createElement('a');
        num.setAttribute('id', i + 1);
        num.setAttribute('href', pageButtonURL(i+1));
        num.innerHTML = i + 1;
        document.getElementById('pagination').appendChild(num);
    }
    num = document.createElement('a');
    num.setAttribute('href', pageButtonURL(parseInt(getURLParam()['page'])+1));
    num.setAttribute('id','next');
    num.innerHTML = '&raquo;';
    document.getElementById('pagination').appendChild(num);
}   

//Run at beginning with jquery
export function initClass() {
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "./application/controllers/classList.php";
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loader');
    document.getElementById('show').appendChild(loading);
    ajax.open(method, url, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    current_page = getURLParam()['page'];
    ajax.send("init=1&current="+current_page);
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('show').removeChild(loading);
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            if(obj == 0) {
                alert("No class found!");
                return;
            }      
            class_num = obj[0];
            page_num = obj[1];
            class_list = [];
            for (let i = 0; i < obj[2].length; i++) {
                obj[2][i].ava = obj[3][i];
                class_list.push(obj[2][i]);
            }
            renderClassNum(class_num);
            createTemplate(class_list);
            pagination(page_num);
            document.getElementById(current_page).setAttribute('class', 'active');
            checkPagingButton();
        }
    };
    
}
//Get class with filter
export function filterClass(dist, sub, gender) {
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "./application/controllers/classList.php";
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loader');
    document.getElementById('show').appendChild(loading);
    ajax.open(method, url, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var filterVal = {
        "district":"-1",
        "subject":"-1",
        "gender_of_tutor":"-1",
    };
    filterVal['district'] = String(dist);
    filterVal['subject'] = String(sub);
    filterVal['gender_of_tutor'] = String(gender);
    if(filterVal['district'] == "-1" && filterVal['subject'] == "-1" && filterVal['gender_of_tutor'] == "-1") {
        initClass();
        return;
    }
    else
    {
        ajax.send("filter=1&filterVal="+JSON.stringify(filterVal));
        current_page = 1;
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('show').removeChild(loading);
                if(this.responseText == 0) {
                    alert("no class");
                    return;
                }
                var obj = JSON.parse(this.responseText);
                console.log(obj);
                if(obj[0] == 0) {
                    alert("No class found!");
                    return;
                }      
                class_num = obj[0];
                page_num = obj[1];
                class_list = [];
                for (let i = 0; i < obj[2].length; i++) {
                    obj[2][i].ava = obj[3][i];
                    class_list.push(obj[2][i]);
                }
                renderClassNum(class_num);
                createTemplate(class_list);

                pagination(page_num);
                document.getElementById(current_page).setAttribute('class', 'active');
                checkPagingButton();
            }
        };
    }
}


//Check next, prev disable button
function checkPagingButton() {
    if(current_page == 1) {
        document.getElementById('prev').style.visibility = 'hidden';
        document.getElementById('next').style.visibility = 'visible';
    }
    if(current_page == page_num) {
        document.getElementById('prev').style.visibility = 'visible';
        document.getElementById('next').style.visibility = 'hidden';
    }
    if(current_page != 1 && current_page != page_num) {
        document.getElementById('prev').style.visibility = 'visible';
        document.getElementById('next').style.visibility = 'visible';
    }
    if(page_num == 1) {
        document.getElementById('prev').style.visibility = 'hidden';
        document.getElementById('next').style.visibility = 'hidden';
    }
}
export function getURLParam() {
    
    let urlString  = window.location.href;
    let url = new URL(urlString);
    let page = url.searchParams.get("page");
    let dist = url.searchParams.get("dist");
    let sub = url.searchParams.get("sub");
    let gender = url.searchParams.get("gender");
    return {page, dist, sub, gender};
}
function pageButtonURL(page) {
    let param = getURLParam();
    if(param['gender']!=null||param['dist']!=null||param['sub']!=null) {
        return '?page='+page+"&dist="+$("#edit-place").val()+"&sub="+$("#edit-subject").val()+"&gender="+$("#edit-gender").val();
    }
    else return '?page='+page;
}
export function keepFilterValue() {
    let param = getURLParam();
    if(param['gender']==null||param['dist']==null||param['sub']==null) {
        document.getElementById("edit-place").value = -1;
        document.getElementById("edit-subject").value = -1;
        document.getElementById("edit-gender").value = -1;
    }
    else {
        document.getElementById("edit-place").value = getURLParam()['dist'];
    }
    
} 
export function getClassFiltered(dist, sub, gender) {
    alert(dist+ " " + sub + " " + gender); 
}


