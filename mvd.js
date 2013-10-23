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

function removeMvd() {
    var span = this;
    var mvd = span.innerText;

    var index = -1;

    for (var i = 0; i < mvds.length; i++) {
        var s = mvds[i].str();
        if (s == mvd) {
            index = i;
        }
    }

    if (index > -1) {
        var obj = mvds.splice(index, 1);
        this.parentElement.removeChild(this);
    }
}

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

    if (lhs.length < 1 || rhs.length < 1) {
        console.log('invalid mvds');
        return;
    }

    var mvd = new Mvd(lhs, rhs);

    var duplicate = false;
    for (var i = 0; i < mvds.length; i++) {
        if (mvds[i].str() == mvd.str()) {
            duplicate = true;
        }
    }
    if (!duplicate) {
        mvds.push(mvd);

        var span = document.createElement('span');
        span.onclick = removeMvd;
        $(span).html(mvd.str());
        $('#mvds')[0].appendChild(span);
        $('#mvds')[0].appendChild(document.createElement('br'));

        $('#startBernstein').prop('disabled', false);
    } else {
        console.log('duplicate mvds: ' + mvd.str());
    }

    $('#mvdRHS > option').each(function() {
        $(this).prop('selected', false);
        $(this).prop('disabled', false);
    });

    $('#mvdLHS > option').each(function() {
        $(this).prop('selected', false);
        $(this).prop('disabled', false);
    });

});
