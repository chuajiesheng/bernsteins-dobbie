function clone(init, copy) {
    $.each(init, function(index, value) {
        var duplicateValue = $.extend(true, {}, value);
        copy.push(duplicateValue)
    });
}

$('#startBernstein').on('click', function () {
    $('#startBernstein').prop('disabled', true);
    console.log('start bernstein algorithm');
    clear();

    // copy
    clone(fds, fds2);
    clone(mvds, mvds2);

    // start bernstein algorithm here
    // step 1
    // pass in fds, return fds
    print_title('Step 1');
    fds = step1(fds);

    // // step 2
    // pass in fds, return fds
    print_title('Step 2');
    fds = step2(fds);

    // step 3
    print_title('Step 3');
    Bernstein.step3(fds);

    // step 4
    print_title('Step 4');
    Bernstein.step4(groupfds);

    // step 5
    print_title('Step 5');
    Bernstein.step5(groupfds);

    // step 6
    print_title('Step 6');
    Bernstein.step6(groupfds);

    // print result
    print_title('Result');
    res = '';
    for (var i = 0; i < rels.length; i++) {
        res += rels[i].html();
        if (i < rels.length - 1) {
            res += ', ';
        }
    }
    print_message(res);

    // // reconstruct
    print_title('Checking reconstructibility');
    reconstruct(groupfds);

    // // find all key
    print_title('Finding all possible keys');
    groupfds=step7(fds2);

    print_title('Finding all possible missing keys');
    groupfds=step8(fds);

});
