import option from "./constant/filterValue.js";
import * as constants from "./constant/city.js";
import { getClassFiltered, initClass, filterClass, keepFilterValue, getURLParam } from "./getClass.js"

const get_weakness_url = "./application/controllers/classList.php";
//Call init class
$(document).ready(function() {
    if (getURLParam()['page'] == null) {
        window.location.replace(window.location.origin + window.location.pathname + '?page=1');
    } else {
        //Render district 
        var optgroup = document.getElementById("district");
        $.each(constants.cityData.districts, function(index, element) {
            var opt = document.createElement('option')
            opt.value = element.id;
            opt.text = element.name;
            optgroup.appendChild(opt);
        });
        //Render subject
        $.ajax({
                type: "POST",
                url: get_weakness_url,
                context: document.body,
                data: { weakness: 1 },
                success: function(responseText) {
                    var obj = JSON.parse(responseText);
                    optgroup = document.getElementById("subject");
                    for (let i in obj) {
                        var opt = document.createElement('option')
                        opt.value = obj[i]['id'];
                        opt.text = obj[i]['name'];
                        optgroup.appendChild(opt);
                    }
                }
            })
            //Render Gender
        optgroup = document.getElementById("gender");
        for (let i in option.gender) {
            var opt = document.createElement('option')
            opt.text = option.gender[i];
            if (option.gender[i] == "Male") {
                opt.value = "M";
            }
            if (option.gender[i] == "Female") {
                opt.value = "F";
            }
            if (option.gender[i] == "Both") {
                opt.value = "B";
            }
            optgroup.appendChild(opt);
        }
        keepFilterValue();
        let param = getURLParam();
        if (param['gender'] == null || param['dist'] == null || param['sub'] == null) {
            initClass();
        } else {
            filterClass($("#edit-place").val(), $("#edit-subject").val(), $("#edit-gender").val());
        }
    }
})

//Function to run after submit filter
$("#submit-button").click(function() {
    window.location.replace(window.location.origin + window.location.pathname + "?page=1" + "&dist=" + $("#edit-place").val() + "&sub=" + $("#edit-subject").val() + "&gender=" + $("#edit-gender").val());
});