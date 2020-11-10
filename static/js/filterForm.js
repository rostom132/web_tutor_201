import option from "./constant/filterValue.js";
import * as constants from "./constant/district_ward.js";
import {getClassFiltered, initClass, filterClass} from "./getClass.js"

//Call init class
$(document).ready(function(){
    initClass();
})
//Prepare filter value
$("#edit-place").one("click",function() {
    var optgroup = document.getElementById("district");
    $.each(constants.cityData.districts, function(index, element){
        var opt = document.createElement('option')
        opt.value = element.id;
        opt.text = element.name;
        optgroup.appendChild(opt);
    });
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
        opt.text = option.gender[i];
        if(option.gender[i] == "Male") {
            opt.value = "M";
        }
        if(option.gender[i] == "Female") {
            opt.value = "F";
        }
        if(option.gender[i] == "Both") {
            opt.value = "B";
        }
        
        optgroup.appendChild(opt);
    }
});
//Function to run after submit filter
$("#submit-button").click(function(){
    filterClass($("#edit-place").val(),$("#edit-subject").val(),$("#edit-gender").val());
});
    