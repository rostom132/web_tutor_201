window.alert = function(message, callback_OK, callback_close) {
    $(document.createElement('div'))
        .attr({ title: 'Notification' })
        .html(message)
        .dialog({
            buttons: {
                OK: function() {
                    if (jQuery.isFunction(callback_OK)) {
                        callback_OK();
                    }
                    $(this).remove();
                }
            },
            close: function() {
                if (jQuery.isFunction(callback_close)) {
                    callback_close();
                }
                $(this).remove();
            },
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
};