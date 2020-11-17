$(document).ready(function() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/getDomain.php?domain=true";
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var domain = this.responseText;
            $('a').each(function() {
                var attr = $(this).attr('href');
                if (typeof attr !== typeof undefined && attr !== false) {
                    $(this).attr('href', domain + attr);
                }
            })
        }
    };
    ajax.send();
});