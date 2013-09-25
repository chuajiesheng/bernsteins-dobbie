$('#fdLHS').on('change', function() {
    var selected_option = $('#fdLHS option:selected');

    for (i = 0; i < selected_option.length; i++) {
        $('#fdRHS > option').each(function() {
            var matched = selected_option[i].value == this.value;
            if (matched) {
                $(this).prop('disabled', true);
            }
        });
    }
});

$('#addFd').on('click', function () {
    var lhs = $('#fdLHS option:selected');
    var rhs = $('#fdRHS option:selected');
    console.log(lhs);
    console.log(rhs);
});
