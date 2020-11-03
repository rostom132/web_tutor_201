var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

var countingPosition = document.getElementById("counting");

function stickyNavbar(type) {
    var navbar = document.getElementById("navbar");
    var link = document.getElementsByClassName("navbar__li");
    var logo = document.getElementById("navbar__logo");
    if (type === "add") {
        navbar.classList.add("sticky");
        logo.classList.add("sticky-logo");
        for (var i = 0; i < link.length; i++) {
            link[i].classList.add("sticky-li");
        }
    } else if (type === "remove") {
        navbar.classList.remove("sticky");
        logo.classList.remove("sticky-logo");
        for (var i = 0; i < link.length; i++) {
            link[i].classList.remove("sticky-li");
        }
    }
}

window.addEventListener("scroll", function() {
    var currentPos = window.pageYOffset || document.documentElement.scrollTop;
    if (currentPos > lastScrollTop || currentPos <= 0) {
        // Scroll up
        stickyNavbar('remove');
        var btnToTop = document.getElementById("go-to-top");
        btnToTop.classList.remove("active");
    } else {
        // Scroll down
        stickyNavbar("add");
    }
    if (currentPos >= 200) {
        var btnToTop = document.getElementById("go-to-top");
        btnToTop.classList.add("active");
    }
    lastScrollTop = currentPos <= 0 ? 0 : currentPos;
})