$('#inputNext').on('click',function() {

    $('#inputNext').prop('disabled', true);
    $('#inputAttributes').prop('disabled', true);

    var attr = $('#inputAttributes').val();
    var arrayOfStrings = attr.split(',');

    for (var i = 0; i < arrayOfStrings.length; i++) {
        var exist = false;
        for (var j = 0; j < attributes.length; j++) {
            if (arrayOfStrings[i] == attributes[j]) {
                exist = true;
            }
        }
        if (!exist && arrayOfStrings[i].length > 0) {
            attributes[attributes.length] = arrayOfStrings[i];
        }
    }

    $('#unique').text('Attributes: ' + attributes);

    for (var i = 0; i < attributes.length; i++) {
        var option = document.createElement('option');
        var t = document.createTextNode(attributes[i]);
        option.setAttribute("value", attributes[i]);
        option.appendChild(t);
        $('#fdLHS').append(option);

        var option2 = document.createElement('option');
        var t2 = document.createTextNode(attributes[i]);
        option2.setAttribute('value', attributes[i]);
        option2.appendChild(t2);
        $('#fdRHS').append(option2);

        var option3 = document.createElement('option');
        var t3 = document.createTextNode(attributes[i]);
        option3.setAttribute('value', attributes[i]);
        option3.appendChild(t3);
        $('#mvdRHS').append(option3);

        var option4 = document.createElement('option');
        var t4 = document.createTextNode(attributes[i]);
        option4.setAttribute('value', attributes[i]);
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
