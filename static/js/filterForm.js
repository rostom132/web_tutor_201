import option from "./constant/filterValue.js";
$("#edit-place").one("click",function() {
    var optgroup = document.getElementById("district");
    for (let i in option.districts) {
        var opt = document.createElement('option')
        opt.value = option.districts[i];
        opt.text = option.districts[i];
        optgroup.appendChild(opt);
    }
});
$("#edit-subject").one("click",function() {
    var optgroup = document.getElementById("subject");
    for (let i in option.subject) {
        var opt = document.createElement('option')
        opt.value = option.subject[i];
        opt.text = option.subject[i];
        optgroup.appendChild(opt);
    }
});
$("#edit-gender").one("click",function() {
    var optgroup = document.getElementById("gender");
    for (let i in option.gender) {
        var opt = document.createElement('option')
        opt.value = option.gender[i];
        opt.text = option.gender[i];
        optgroup.appendChild(opt);
    }
});
    