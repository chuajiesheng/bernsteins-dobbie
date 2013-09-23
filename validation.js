$('#inputAttributes').bind('input', function() {
    var inputStr = $(this).val();
    var lastChar = (inputStr.charAt(inputStr.length - 1)).toLowerCase();

    var re = /[0-9a-zA-Z]/;
    var re2 = /[0-9a-zA-Z,]/;

    if (inputStr.length == 0) {
        // does nth
    } else if (inputStr.length == 1) {
        if (!lastChar.match(re)) {
            $(this).val(inputStr.substring(0, inputStr.length -1));
        }
    } else {
        var last2Char = (inputStr.charAt(inputStr.length -2)).toLowerCase();
        if (!(lastChar.match(re2))) {
            $(this).val(inputStr.substring(0, inputStr.length - 1));
        } else if (last2Char == ',' && lastChar == ',') {
            $(this).val(inputStr.substring(0, inputStr.length -1));
        }
    }
});
