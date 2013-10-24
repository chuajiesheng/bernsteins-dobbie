var major = 0;
var minor = 1;

function print(message) {
    var text = $('#console').html();
    text += message
    $('#console').html(text);
}

function print_message(message) {
    print(major + '.' + minor + '. ' + message + '<br />');
    minor = minor + 1;
}

function print_title(title) {
    if (major > 0 && minor == 1) {
        print_message('No changes is made at this step');
    }

    major = major + 1;
    minor = 1;

    print('<h4>' + major + '. ' + title + '</h4>');
}

function clear() {
    $('#console').html('');
    major = 0;
    minor = 1;
}
