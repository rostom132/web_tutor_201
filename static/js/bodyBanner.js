$("a[id^='tutor_']").mouseenter(function popupDesription(id) {
    var popup = document.getElementById(this.id + "_pop");
    popup.classList.toggle("show");
});

$("a[id^='tutor_']").mouseout(function hideDescription(id) {
    var popup = document.getElementById(this.id + "_pop");
    popup.classList.toggle("show");
});

function register(role) {
    if (role != "") localStorage.setItem('register-role', role);
    window.location = (window.location.origin + "/" + window.location.pathname.split('/')[1] + "/formRegister");
}

$("#register-tutor").click(function() {
    register('tutor');
});
$("#register-parent").click(function() {
    register('parent');
});