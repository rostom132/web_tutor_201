// Global var
var class_num;
var page_num;
var class_list;
let current_page = 1;
function renderClassNum(class_num) {
    if(class_num <= 1) {
        document.getElementById('count').innerHTML = class_num;
    }
    else {
        document.getElementById('count').innerHTML = class_num;
    }
}
function createTemplate(class_list) {
    document.getElementById('show').innerHTML="";
    var default_avatar = "https://d1plicc6iqzi9y.cloudfront.net/sites/default/files/styles/baiviet_50_50/public/AAuE7mBFjncP4O9wWvDXYnppGHsN0WgfIA6rRp0AfKXw%3Ds96-c";
    var infor_icon = "../../static/images/icon/information.png";
    var money_icon = "../../static/images/icon/moneybag.jpeg";
    var student_icon = "../../static/images/icon/student.png";
    for(let i = 0; i < class_list.length; i++)
    {
        var class_title = class_list[i]['description'];
        var dist = class_list[i]['district'];
        var gender;
        if(class_list[i]['gender_of_tutor'] == 'F') {
            gender =  "Female";
        }
        else if(class_list[i]['gender_of_tutor'] == "M") {
            gender = "Male";
        }
        else {
            gender = "Male/Female";
        }
        var salary = class_list[i]['salary'];
        var student_no = class_list[i]['no_students'];
        var template = document.createElement('div');
        template.setAttribute('class', 'row-wrapper shadow-box');
        template.innerHTML = `<div class="ribbon">
        <p>ENG</p>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <div class="class-left-col">
                    <p style="height: 50px;">
                        <img src= ${default_avatar}  alt="" class="class-avatar">
                    </p>
                    <p>Anonimous</p>
                    <p>10/12/2020</p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="class-info-col">
                    <p>
                        <img src=${infor_icon} style="width: 30px; height: 30px;">
                        <span id="class-title">${class_title}</span>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit hahahahahahaahahasdasdasdasasdasdasdasdaSDasdaSDasdaSDasdaS...
                    </p>
                    <span class="group-span">Toán(ENG)</span>
                    <span class="group-span">Quận ${dist}</span>
                    <span class="group-span">${gender}</span>
                </div>
            </div>
            <div class="col-sm-2" style="text-align:center">
                <img src=${money_icon} style="width: 30px; height: 30px;">
                <div style="display:-webkit-inline-box;"><p style="font-size:1.5em; color:gold">${String(salary).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</p><p class="lang" key="CLASSINFO.SALARY" id="salary"></p></div>
            </div>
            <div class="col-sm-2" style="text-align:center">
                <img src=${student_icon} style="width: 30px; height: 30px;">
                <p style="font-size:25px; bold ;color:#ff6600">${student_no}</p>
            </div>
        </div>`;
        document.getElementById('show').appendChild(template);
    }

}
function pagination(page_num) {
    var page = document.createElement('div');
    page.setAttribute('class', 'pagination');
    page.setAttribute('id', 'pagination');
    document.getElementById('page-wrapper').appendChild(page);
    var num = document.createElement('button');
    num.setAttribute('type', 'button');
    num.setAttribute('onclick','prevPage();checkPagingButton()');
    num.setAttribute('id','prev');
    num.innerHTML='&laquo;';
    document.getElementById('pagination').appendChild(num);
    for(i = 0; i < page_num; i++) {
        num = document.createElement('button');
        num.setAttribute('id', i + 1);
        num.setAttribute('button', 'button');
        num.setAttribute('onclick','getPage(this.id);checkPagingButton()');
        num.innerHTML = i + 1;
        document.getElementById('pagination').appendChild(num);
    }
    num = document.createElement('button');
    num.setAttribute('button', 'button');
    num.setAttribute('onclick','nextPage();checkPagingButton()');
    num.setAttribute('id','next');
    num.innerHTML = '&raquo;';
    document.getElementById('pagination').appendChild(num);
}   
$(function initClass() {
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "ClassInfo.php";
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loader');
    document.getElementById('show').appendChild(loading);
    ajax.open(method, url, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("init=1&current=1");
    current_page = 1;
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('show').removeChild(loading);
            var obj = JSON.parse(this.responseText);
            class_num = obj[0];
            page_num = obj[1];
            class_list = [];
            for (i = 0; i < obj[2].length; i++) {
                class_list.push(obj[2][i]);
            }
            console.log(class_list); //debug
            renderClassNum(class_num);
            createTemplate(class_list);
            pagination(page_num);
            document.getElementById(current_page).setAttribute('class', 'active');
            checkPagingButton();
        }
    };
})
function getPage(mess) {
    var nodes = document.getElementById('pagination').childNodes;
    for(var i=0; i<nodes.length; i++) {
        nodes[i].setAttribute('class', '');
    }
    document.getElementById(mess).setAttribute('class', 'active');
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "ClassInfo.php?current="+mess;
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loader');
    document.getElementById('show').appendChild(loading);
    current_page = mess;
    console.log(current_page);
    ajax.open(method, url, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('show').removeChild(loading);
            var obj = JSON.parse(this.responseText);
            class_list = [];
            for (i = 0; i < obj[2].length; i++) {
                class_list.push(obj[2][i]);
            }
            createTemplate(class_list);
        }
    };
}
function nextPage() {
    var nodes = document.getElementById('pagination').childNodes;
    for(var i=0; i<nodes.length; i++) {
        nodes[i].setAttribute('class', '');
    }
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "ClassInfo.php";
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loader');
    document.getElementById('show').appendChild(loading);
    ajax.open(method, url, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    current_page = parseInt(current_page);
    if(current_page < page_num) {
        current_page += 1;
    }
    document.getElementById(current_page).setAttribute('class', 'active');
    console.log(current_page);
    ajax.send("init=2&current="+current_page);
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('show').removeChild(loading);
            var obj = JSON.parse(this.responseText);
            class_list = [];
            for (i = 0; i < obj[2].length; i++) {
                class_list.push(obj[2][i]);
            }
            createTemplate(class_list);
        }
    };
}
function prevPage() {
    var nodes = document.getElementById('pagination').childNodes;
    for(var i=0; i<nodes.length; i++) {
        nodes[i].setAttribute('class', '');
    }
    var ajax = new XMLHttpRequest();
    var method = "POST";
    var url = "ClassInfo.php";
    var loading = document.createElement('div');
    loading.setAttribute('class', 'loader');
    document.getElementById('show').appendChild(loading);
    ajax.open(method, url, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(current_page > 1) {
        current_page -= 1;
    }
    document.getElementById(current_page).setAttribute('class', 'active');
    console.log(current_page);
    ajax.send("init=3&current="+current_page);
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('show').removeChild(loading);
            var obj = JSON.parse(this.responseText);
            class_list = [];
            for (i = 0; i < obj[2].length; i++) {
                class_list.push(obj[2][i]);
            }
            createTemplate(class_list);
        }
    };
}
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

