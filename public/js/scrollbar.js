var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

var countingPosition = document.getElementById("counting");

function stickyNavbar(type) {
    var navbar = document.getElementById("navbar");
    var link = document.getElementsByClassName("navbar-wrapper__link");
    if (type === "add") {
        navbar.classList.add("sticky");
        for (var i = 0; i < link.length; i++) {
            link[i].classList.add("sticky-text");
        }
    } else if (type === "remove") {
        navbar.classList.remove("sticky");
        for (var i = 0; i < link.length; i++) {
            link[i].classList.remove("sticky-text");
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