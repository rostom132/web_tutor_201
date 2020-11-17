export function getAvatar() {
    if ($("#ava").length) {
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "application/controllers/navbar.php?getAva=true";
        ajax.open(method, url, true);
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText != "") {
                    $("#ava").attr("src", this.responseText);
                } else {
                    $("#ava").attr("src", "https://image.ibb.co/n7oTvU/logo_white.png");
                }
            }
        };
        ajax.send();
    }
}