import arrLang from "./name.js";

function translateLang(lang) {
    $('.lang').each(function(index, item) {
        $(this).text(arrLang[lang][$(this).attr('key')]);
    });
}


$(function() {
    //first check for stored language in localStorage i.e. fetch data from localStorage
    let stored_lang = localStorage.getItem("stored_lang");
    //if any then translate page accordingly
    if (stored_lang != null && stored_lang != undefined) {
        console.log(stored_lang);
        translateLang(stored_lang);
    } else {
        localStorage.setItem("stored_lang", "en");
        translateLang("en");
    }

    $('#language_flag').click(function() {
        var language_flag = document.getElementById("language_flag");
        var currentLang = localStorage.getItem("stored_lang");
        if (currentLang === "en") {
            localStorage.setItem("stored_lang", "vn");
            translateLang("vn");
            language_flag.classList.remove("vn_flag");
            language_flag.classList.add("en_flag");
        } else {
            localStorage.setItem("stored_lang", "en");
            translateLang("en");
            language_flag.classList.remove("en_flag");
            language_flag.classList.add("vn_flag");
        }
    });
});