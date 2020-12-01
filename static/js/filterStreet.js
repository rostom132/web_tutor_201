const KEYUP = 38;
const KEYDOWN = 40;
const ENTER = 13;

export function autoComplete($inp, arr) {
    var currentFocus;
    $inp.on("input", function(e) {
        var a, b, i, val = $(this).val();
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = $("<div></div>", {
            "class": "autocomplete-items",
            "id": $(this).attr("id") + "autocomplete-list",
        }).appendTo($(this).parent());
        for (i = 0; i < arr.length; i++) {
            if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = $("<div id='" + arr[i].id + "'>" + arr[i].prefix + " " + "<strong>" + arr[i].name.substr(0, val.length) + "</strong>" + arr[i].name.substr(val.length) + "<input type='hidden' value='" + arr[i].prefix + " " + arr[i].name + "'></div>").appendTo(a);
                b.click(function() {
                    $inp.val($(this).find("input").val());
                    $("#registerClass-address").val($inp.val());
                    $("#registerClass-address")[0].setSelectionRange(0, 0);
                });
            }
        }
    });
    $inp.on("keydown", function(e) {
        var $x = $("#" + $(this).attr("id") + "autocomplete-list");
        if ($x) $x = $x.find("div");
        if (e.keyCode == KEYDOWN) {
            currentFocus++;
            addActive($x);
        } else if (e.keyCode == KEYUP) {
            currentFocus--;
            addActive($x);
        } else if (e.keyCode == ENTER) {
            e.preventDefault();
            if (currentFocus > -1) {
                if ($x) $x[currentFocus].click();
            }
        }
    });

    function addActive($x) {
        if (!$x) return false;
        removeActive($x);
        if (currentFocus >= $x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = ($x.length - 1);
        $x.eq(currentFocus).addClass("autocomplete-active");
    }

    function removeActive($x) {
        $x.each(function(index, value) {
            $(this).removeClass("autocomplete-active");
        })
    }

    function closeAllLists(elmnt) {
        var $x = $(".autocomplete-items");
        $x.each(function(index, value) {
            if (elmnt != $(this) && elmnt != $inp) {
                $(this).remove();
            }
        });
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}