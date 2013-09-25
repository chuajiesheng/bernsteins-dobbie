$('#mvdLHS').on('change', function() {
    var selected_option = $('#mvdLHS option:selected');
    var rhs = $('#mvdRHS > option');

    $('#mvdRHS > option').each(function() {
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

$('#mvdRHS').on('change', function() {
    var selected_option = $('#mvdRHS option:selected');
    var lhs = $('#mvdLHS > option');

    $('#mvdLHS > option').each(function() {
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

$('#addMvd').on('click', function () {
    var lhs = [];
    var rhs = [];

    $('#mvdLHS option:selected').each(function() {
        lhs.push(this.value);
        $(this).prop('selected', false)
    });

    $('#mvdRHS > option:selected').each(function() {
        rhs.push(this.value);
        $(this).prop('selected', false)
    });

    var mvd = new Mvd(lhs, rhs);
    // TODO: check for duplicate mvds
    mvds.push(mvd);

    var span = document.createElement('span');
    $(span).html(mvd.str());
    $('#mvds')[0].appendChild(span);
    $('#mvds')[0].appendChild(document.createElement('br'));
});
