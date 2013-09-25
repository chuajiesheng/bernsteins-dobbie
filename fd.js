$('#fdLHS').on('change', function() {
    var selected_option = $('#fdLHS option:selected');
    var rhs = $('#fdRHS > option');

    $('#fdRHS > option').each(function() {
        var isSelected = false;
        for (i = 0; i < selected_option.length; i++) {
            var matched = selected_option[i].value == this.value;
            if (matched) {
                isSelected = true;
            }
        }

        if (isSelected) {
            $(this).prop('selected', false);
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
    });
});

$('#fdRHS').on('change', function() {
    var selected_option = $('#fdRHS option:selected');
    var lhs = $('#fdLHS > option');

    $('#fdLHS > option').each(function() {
        var isSelected = false;
        for (i = 0; i < selected_option.length; i++) {
            var matched = selected_option[i].value == this.value;
            if (matched) {
                isSelected = true;
            }
        }

        if (isSelected) {
            $(this).prop('selected', false);
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
    });
});

var fds = [];

$('#addFd').on('click', function () {
    var lhs = [];
    var rhs = [];

    $('#fdLHS option:selected').each(function() {
        lhs.push(this.value);
        $(this).prop('selected', false)
    });

    $('#fdRHS > option:selected').each(function() {
        rhs.push(this.value);
        $(this).prop('selected', false)
    });

    var fd = new Fd(lhs, rhs);
    // TODO: check for duplicate fds
    fds.push(fd);

    var span = document.createElement('span');
    $(span).html(fd.str());
    $('#fds')[0].appendChild(span);
    $('#fds')[0].appendChild(document.createElement('br'));
});
