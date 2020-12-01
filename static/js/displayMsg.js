window.alert = function(message, callback) {
    $(document.createElement('div'))
        .attr({ title: 'Notification' })
        .html(message)
        .dialog({
            buttons: {
                OK: function() {
                    if (jQuery.isFunction(callback)) {
                        callback();
                    }
                    $(this).dialog('close');
                }
            },
            close: function() { $(this).remove(); },
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
};