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
    var lhs = $('#fdLHS option:selected');
    var rhs = $('#fdRHS option:selected');
    console.log(lhs);
    console.log(rhs);
});
