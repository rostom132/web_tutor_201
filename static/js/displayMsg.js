window.alert = function(message, callback) {
    $(document.createElement('div'))
        .attr({ title: 'Notification' })
        .html(message)
        .dialog({
            buttons: {
                OK: function() {
                    if (jQuery.isFunction(callback)) {
                        $(this).dialog('close');
                        callback();
                    }
                }
            },
            close: function() { $(this).remove(); },
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
};