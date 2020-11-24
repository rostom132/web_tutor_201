import { arrLang } from "./constant/language.js";

export function translate(lang) {
    $('.lang').each(function(index, item) {
        var $placeHolder = $(this).attr('placeholder');
        var $arrAttr = $(this).attr('key');
        if ($arrAttr !== undefined) {
            $arrAttr = $arrAttr.split(".");
            if ($placeHolder !== undefined) {
                $(this).attr('placeholder', arrLang[lang][$arrAttr[0]][$arrAttr[1]]);
                return;
            }
            $(this).text(arrLang[lang][$arrAttr[0]][$arrAttr[1]]);
        }
    });
}

export function getText(key) {
    var $arrAttr = key.split(".");
    let lang = localStorage.getItem("stored_lang");
    if (lang != 'en' && lang != 'vn') {
        return arrLang['en'][$arrAttr[0]][$arrAttr[1]];
    } else {
        return arrLang[localStorage.getItem('stored_lang')][$arrAttr[0]][$arrAttr[1]];
    }
}

function translateLang() {
    var currentLang = localStorage.getItem("stored_lang");
    var language_flag = document.getElementById("language_flag");
    var contact_us = document.getElementsByClassName("contact-us");
    if (currentLang === "en") {
        localStorage.setItem("stored_lang", "vn");
        translate("vn");
        language_flag.classList.remove("vn_flag");
        language_flag.classList.add("en_flag");
        contact_us[0].classList.add("contact-us-vn");
    } else {
        localStorage.setItem("stored_lang", "en");
        translate("en");
        language_flag.classList.remove("en_flag");
        language_flag.classList.add("vn_flag");
        contact_us[0].classList.remove("contact-us-vn");
    }
}

$(function() {
    //first check for stored language in localStorage i.e. fetch data from localStorage
    let stored_lang = localStorage.getItem("stored_lang");
    var language_flag = document.getElementById("language_flag");
    var contact_us = document.getElementsByClassName("contact-us");
    //if any then translate page accordingly
    if (stored_lang == 'en' || stored_lang == 'vn') {
        translate(stored_lang);
        if (stored_lang == "vn") {
            contact_us[0].classList.add("contact-us-vn");
            language_flag.classList.remove("vn_flag");
            language_flag.classList.add("en_flag");
        }
    } else {
        localStorage.setItem("stored_lang", "en");
        translate("en");
    }

    $('#language_flag').click(translateLang);
});