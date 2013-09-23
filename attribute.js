$('#inputNext').on("click",function() {

    $('#inputNext').prop('disabled', true);
    $('#inputAttributes').prop('disabled', true);

    var attr = $('#inputAttributes').val();
    var arrayOfStrings = attr.split(',');

    for (var i = 0; i < arrayOfStrings.length; i++) {
        var exist = false;
        for (var j = 0; j < uniqueElement.length; j++) {
            if (arrayOfStrings[i] == uniqueElement[j]) {
                exist = true;
            }
        }
        if (!exist && arrayOfStrings[i].length > 0) {
            uniqueElement[uniqueElement.length] = arrayOfStrings[i];
        }
    }

    $('#unique').text("Attributes: " + uniqueElement);

    for (var i = 0; i < uniqueElement.length; i++) {
        var option = document.createElement('option');
        var t = document.createTextNode(uniqueElement[i]);
        option.setAttribute("value", uniqueElement[i]);
        option.appendChild(t);
        $('#fdLHS').append(option);

        var option2 = document.createElement('option');
        var t2 = document.createTextNode(uniqueElement[i]);
        option2.setAttribute("value", uniqueElement[i]);
        option2.appendChild(t2);
        $('#fdRHS').append(option2);
    }

    $('#fdLHS').prop('disabled', false);
    $('#fdRHS').prop('disabled', false);
    $('#addFd').prop('disabled', false);


});
