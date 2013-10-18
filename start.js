$('#startBernstein').on('click', function () {
    console.log('start bernstein algorithm');

    // start bernstein algorithm here
    // step 1
    // pass in fds, return fds
    fds = step1(fds);
    
    // step 2
    // pass in fds, return fds
    fds = step2(fds);

    // step 3
    Bernstein.step3(fds);

    // step 4
    Bernstein.step4(groupfds);

    // step 5
    Bernstein.step5(groupfds);
    
    // step 6
    Bernstein.step6(groupfds);


});
