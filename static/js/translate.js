import { arrLang } from "./constant/language.js";

function translateLang(lang) {
    $('.lang').each(function(index, item) {
        var $arrAttr = $(this).attr('key').split('.');
        $(this).text(arrLang[lang][$arrAttr[0]][$arrAttr[1]]);
    });
}

$(function() {
    //first check for stored language in localStorage i.e. fetch data from localStorage
    let stored_lang = localStorage.getItem("stored_lang");
    //if any then translate page accordingly
    if (stored_lang != null && stored_lang != undefined) {
        translateLang(stored_lang);
    } else {
        localStorage.setItem("stored_lang", "en");
        translateLang("en");
    }

    $('#language_flag').click(function() {
        var language_flag = document.getElementById("language_flag");
        var currentLang = localStorage.getItem("stored_lang");
        var contact_us = document.getElementsByClassName("contact-us");
        if (currentLang === "en") {
            localStorage.setItem("stored_lang", "vn");
            translateLang("vn");
            language_flag.classList.remove("vn_flag");
            language_flag.classList.add("en_flag");
            contact_us[0].classList.add("contact-us-vn");
        } else {
            localStorage.setItem("stored_lang", "en");
            translateLang("en");
            language_flag.classList.remove("en_flag");
            language_flag.classList.add("vn_flag");
            contact_us[0].classList.remove("contact-us-vn");
        }
    });
});