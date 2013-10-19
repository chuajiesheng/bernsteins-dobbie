var major = 0;
var minor = 1;

function print(message) {
    var text = $('#console').html();
    text += message
    $('#console').html(text);
}

function print_title(title) {
    major = major + 1;
    minor = 1;

    print('<h4>' + major + '. ' + title + '</h4>');
}

function print_message(message) {
    print(major + '.' + minor + '. ' + message + '<br />');
    minor = minor + 1;
}
