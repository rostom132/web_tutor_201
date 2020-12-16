import { getAvatar } from "./getAvaNavbar.js";

$('#hamberger-navbar').click(function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    $("#navbar__options").slideUp(500);
});

/* Set the width of the side navigation to 0 */
$('#hamberger-navbar-close').click(function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $("#navbar__options").slideDown(500);
});

function logOut() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "application/controllers/navbar.php?logout=true";
    ajax.open(method, url, true);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "") {
                window.location.replace(window.location.origin + "/" + window.location.pathname.split('/')[1] + "/bodyBanner");
            } else {
                alert('Logout fail!');
            }
        }
    };
    ajax.send();
}

$('#logout-button').click(() => logOut());

$('#logout-sidenav').click(() => logOut());

$(document).ready(function() {
    getAvatar();
    sessionStorage.clear()
});