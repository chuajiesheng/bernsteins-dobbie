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

        var option3 = document.createElement('option');
        var t3 = document.createTextNode(uniqueElement[i]);
        option3.setAttribute("value", uniqueElement[i]);
        option3.appendChild(t3);
        $('#mvdRHS').append(option3);

        var option4 = document.createElement('option');
        var t4 = document.createTextNode(uniqueElement[i]);
        option4.setAttribute("value", uniqueElement[i]);
        option4.appendChild(t4);
        $('#mvdLHS').append(option4);
    }

    $('#fdLHS').prop('disabled', false);
    $('#fdRHS').prop('disabled', false);
    $('#addFd').prop('disabled', false);

    $('#mvdLHS').prop('disabled', false);
    $('#mvdRHS').prop('disabled', false);
    $('#addMvd').prop('disabled', false);

});
