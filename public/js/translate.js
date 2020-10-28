var arrLang = {
    "en": {
        "introduction": "Introduction",
        "users": "Users",
        "parents": "Parents",
        "login": "Login",
        "contact": "Contact Us"
    },
    "vn": {
        "introduction": "Giới thiệu",
        "users": "Người dùng",
        "parents": "Phụ huynh",
        "login": "Đăng nhập",
        "contact": "Liên hệ",
    }
}

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
        lang = stored_lang;
        translateLang(lang);
    }

    // $('.translate').click(function() {
    //     var lang = $(this).attr('id');
    //     //on click store language on click to localStorage
    //     localStorage.setItem("stored_lang", lang);
    //     translateLang(lang);
    // });

});