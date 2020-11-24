export function getData(url) {
    var result;
    $.ajax({
        dataType: "json",
        url: url,
        data: "",
        success: function(response) {
            result = response;
        },
        async: false
    });
    return result;
}